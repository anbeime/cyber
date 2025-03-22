// 开始开光
startEnlighten() {
  if (!this.data.selectedImage || !this.data.wish) {
    wx.showToast({
      title: '请完成前两步',
      icon: 'none'
    })
    return
  }

  this.setData({
    isEnlightening: true,
    enlightenProgress: 0,
    ceremonyMessage: '正在注入佛光...'
  })

  // 模拟开光过程
  const messages = [
    '佛光普照...',
    '注入智慧...',
    '加持愿力...',
    '净化心灵...',
    '开光完成！'
  ]

  let progress = 0;

  // 修改：添加开光进度模拟逻辑
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 20;
      // 新增：根据进度更新提示信息
      const currentMessage = messages[Math.floor(progress/20) - 1] || messages[0];
      this.setData({ 
        enlightenProgress: progress,
        ceremonyMessage: currentMessage  // ✅ 添加进度提示更新
      });
    } else {
      clearInterval(interval);
      // 修复：改用全局数据更新
      const app = getApp();
      app.globalData.karmaPoints += 10;
      wx.setStorageSync('karmaPoints', app.globalData.karmaPoints);
      
      this.setData({
        isEnlightening: false,
        ceremonyMessage: messages[messages.length - 1],  // ✅ 使用预定义的完成提示
        isCompleted: true,
        buddhaMessage: '佛光已注入此物，愿其助你清净心绪'
      });
    }
  }, 1000);
}