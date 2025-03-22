App({
  globalData: {
    userInfo: null,
    karmaPoints: 0,  // ✅ 确保功德值初始化
    meditationTime: 0,
    dailyWisdom: '',
    enlightenedItems: []
  },
  
  onLaunch() {
    // 初始化加载存储数据
    try {
      this.globalData.karmaPoints = wx.getStorageSync('karmaPoints') || 0;
      this.globalData.enlightenedItems = wx.getStorageSync('enlightenedItems') || [];
    } catch (e) {
      console.error('本地存储加载失败:', e);
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  }
});