// 修改：完善store的同步逻辑
export const useKarmaStore = defineStore('karma', {
  state: () => ({
    karmaPoints: 0,
    exchangeHistory: []
  }),
  actions: {
    updateKarmaPoints(points) {
      this.karmaPoints = points;
      // 新增：同步到本地存储
      wx.setStorageSync('karmaPoints', this.karmaPoints);
    },
    recordExchange(record) {
      this.exchangeHistory.push(record);
      // 新增：同步到本地存储
      wx.setStorageSync('exchangeHistory', this.exchangeHistory);
    }
  }
});