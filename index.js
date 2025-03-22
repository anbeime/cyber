Page({
  data: {
    navItems: [
      { icon: '🏠', label: '首页', url: '/pages/index/index' },
      { icon: '🌙', label: 'AI解签', url: '/views/karma/signs' }, // 图标更换为 AI解签图标
      { icon: '👤+', label: '个人中心', url: '/views/profile/profile' } // 图标更换为 复合图标
    ]
  },
  // 其他原有逻辑保持不变
});