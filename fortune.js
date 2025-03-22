// 解签服务
async getFortuneReading(question, isAnonymous = false) {
  let loadingShown = false;
  try {
    // 参数校验
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      throw new Error('请输入有效的问题');
    }

    // 显示加载提示
    try {
      wx.showLoading({
        title: '正在解签...',
        mask: true
      });
      loadingShown = true;
    } catch (loadingError) {
      console.error('显示加载提示失败:', loadingError);
    }

    // 记录用户信息
    if (!isAnonymous && app?.globalData?.userInfo) {
      try {
        // TODO: 保存用户解签记录
        await this.saveFortuneRecord?.(question, app.globalData.userInfo);
      } catch (recordError) {
        console.error('保存解签记录失败:', recordError);
      }
    }
    
    // 分析问题主题
    let topics = [];
    try {
      topics = this.analyzeQuestion?.(question) || [];
    } catch (analyzeError) {
      console.error('分析问题主题失败:', analyzeError);
    }
    const mainTopic = topics[0] || '事业';
    
    // 构建智谱AI提示词
    const prompt = `请你扮演一位精通佛学、道教和玄学的解签大师，为用户提供一段解签内容。

用户问题：${question.slice(0, 100)}

请按照以下格式回复：
{
  "fortuneLevel": "[上签/中签/下签]",
  "message": "[简短有力的签文，类似诗句]",
  "advice": "[详细的解析和建议，至少100字]",
  "relatedTopics": ["相关主题标签，如：事业、财运、健康等"]
}

注意：
1. 签文应简短有力，富有哲理
2. 解析应详细具体，针对用户问题给出实用建议
3. 内容要符合中国传统文化，融入佛道智慧
4. 回复必须是JSON格式`;
    
    // 调用智谱AI
    let fortune;
    try {
      const aiResponse = await Promise.race([
        this.callZhipuAI(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI响应超时')), 15000))
      ]);
      
      if (!aiResponse || typeof aiResponse !== 'string') {
        throw new Error('AI返回数据格式错误');
      }

      const sanitizedResponse = aiResponse.replace(/[\u0000-\u001F]/g, '');
      fortune = this.parseAIResponse(sanitizedResponse, mainTopic);
      
      // 验证解签数据完整性
      if (!fortune?.level || !fortune?.message || !fortune?.advice) {
        throw new Error('解签数据不完整');
      }

      // 规范化签文等级
      fortune.level = ['上签', '中签', '下签'].includes(fortune.level) ? fortune.level : '中签';
      
      // 确保相关主题非空
      fortune.relatedTopics = Array.isArray(fortune.relatedTopics) && fortune.relatedTopics.length > 0
        ? fortune.relatedTopics
        : [mainTopic];

    } catch (error) {
      console.error('AI解签失败，使用本地生成:', error);
      try {
        // 尝试使用本地签文生成
        fortune = this.generateFortune(question);
        if (!fortune) {
          fortune = this.getDefaultFortune();
        }
        if (!fortune) {
          throw new Error('本地签文生成失败');
        }
      } catch (fallbackError) {
        console.error('本地签文生成失败:', fallbackError);
        throw new Error('解签服务暂时不可用，请稍后再试');
      }
    }
    
    // 更新功德值
    let karmaPoints = 5;
    try {
      if (app?.globalData) {
        const currentKarma = app.globalData.karmaPoints || 0;
        karmaPoints = Math.min(5, currentKarma + 5);
        app.globalData.karmaPoints = Math.max(0, karmaPoints);
        wx.setStorageSync('karmaPoints', app.globalData.karmaPoints);
      }
    } catch (karmaError) {
      console.error('更新功德值失败:', karmaError);
      karmaPoints = 0;
    }
    
    return {
      success: true,
      data: {
        ...fortune,
        karmaPoints
      }
    };
  } catch (error) {
    console.error('解签失败:', error);
    return {
      success: false,
      message: error.message || '解签失败，请稍后重试',
      code: error.code || 500
    };
  } finally {
    // 确保在所有情况下都隐藏加载提示
    if (loadingShown) {
      try {
        wx.hideLoading();
      } catch (hideError) {
        console.error('隐藏加载提示失败:', hideError);
      }
    }
  }
}