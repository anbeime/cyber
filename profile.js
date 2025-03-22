const app = getApp()
const { karmaStore } = require('../../store/index.js')

Page({
  data: {
    currentTab: 'profile',
    userProfile: {
      avatar: '',
      nickname: '',
      bio: '',
      level: 1,
      merits: 0,
      enlightenCount: 0,
      daysRegistered: 0
    },
    form: {
      nickname: '',
      bio: '',
      email: ''
    },
    notificationSettings: {
      enlightenComplete: true,
      meritsUpdate: true,
      achievementUnlocked: true
    },
    privacySettings: {
      showMerits: true,
      showEnlightenHistory: true,
      showAchievements: true
    },
    showKarmaDetails: false,
    karmaHistory: [],
    // 修改：添加功德值变更记录字段
    karmaChangeLogs: []
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    // 每次显示页面时更新数据
    this.loadUserInfo()
  },

  // 新增：从store加载数据
  loadKarmaData() {
    this.setData({
      karmaPoints: karmaStore.karmaPoints,
      exchangeHistory: karmaStore.exchangeHistory
    });
  },

  // 加载用户资料
  loadUserInfo() {
    const userProfile = wx.getStorageSync('userProfile') || this.data.userProfile
    const globalData = app.globalData

    // 更新用户资料
    this.setData({
      userProfile: {
        ...userProfile,
        merits: globalData.karmaPoints || 0,
        enlightenCount: globalData.enlightenedItems?.length || 0,
        daysRegistered: this.calculateDaysRegistered(userProfile.registerDate)
      },
      form: {
        nickname: userProfile.nickname || '',
        bio: userProfile.bio || '',
        email: userProfile.email || ''
      }
    })
  },

  // 新增：加载功德历史记录
  loadKarmaHistory() {
    const logs = wx.getStorageSync('karmaLogs') || [];
    this.setData({ karmaChangeLogs: logs });
  },

  // 切换功德详情显示
  toggleKarmaDetails() {
    this.setData({
      showKarmaDetails: !this.data.showKarmaDetails
    })
  },

  loadSettings() {
    const notificationSettings = wx.getStorageSync('notificationSettings') || this.data.notificationSettings
    const privacySettings = wx.getStorageSync('privacySettings') || this.data.privacySettings

    this.setData({
      notificationSettings,
      privacySettings
    })
  },

  // 计算注册天数
  calculateDaysRegistered(registerDate) {
    if (!registerDate) return 0
    const now = new Date()
    const register = new Date(registerDate)
    const diffTime = Math.abs(now - register)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      currentTab: tab
    })
  },

  // 表单输入处理
  onNicknameInput(e) {
    this.setData({
      'form.nickname': e.detail.value
    })
  },

  onBioInput(e) {
    this.setData({
      'form.bio': e.detail.value
    })
  },

  onEmailInput(e) {
    this.setData({
      'form.email': e.detail.value
    })
  },

  // 更新个人资料
  updateProfile() {
    const { form } = this.data
    const userProfile = {
      ...this.data.userProfile,
      ...form
    }

    // 保存到本地存储
    wx.setStorageSync('userProfile', userProfile)
    
    // 更新全局数据
    app.globalData.userProfile = userProfile

    // 更新页面数据
    this.setData({ userProfile })

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  // 切换通知设置
  toggleNotification(e) {
    const type = e.currentTarget.dataset.type
    const value = e.detail.value
    
    this.setData({
      [`notificationSettings.${type}`]: value
    })

    // 保存设置
    wx.setStorageSync('notificationSettings', this.data.notificationSettings)
  },

  // 切换隐私设置
  togglePrivacy(e) {
    const type = e.currentTarget.dataset.type
    const value = e.detail.value
    
    this.setData({
      [`privacySettings.${type}`]: value
    })

    // 保存设置
    wx.setStorageSync('privacySettings', this.data.privacySettings)
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          this.loadUserInfo()
          this.loadSettings()
          
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 显示关于我们
  showAbout() {
    wx.showModal({
      title: '关于我们',
      content: '赛博烧香小程序 v1.0.0\n\n愿您在这里找到内心的平静。',
      showCancel: false
    })
  },

  // 显示意见反馈
  showFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  // 新增：加载功德值
  loadKarmaPoints() {
    // 新增本地存储优先策略
    const storedPoints = wx.getStorageSync('karmaPoints') || 0
    this.setData({
      karmaPoints: storedPoints
    });
    // 同步更新全局数据
    app.globalData.karmaPoints = storedPoints
  },

  // 修改：更新功德值时记录日志
  updateKarma(value) {
    const newKarma = this.data.karmaPoints + value;
    const log = {
      time: new Date().toLocaleString(),
      change: value,
      balance: newKarma
    };
    const logs = [...this.data.karmaChangeLogs, log];
    this.setData({ karmaPoints: newKarma, karmaChangeLogs: logs });
    wx.setStorageSync('karmaLogs', logs);
  }
})