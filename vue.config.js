module.exports = {
  "transpileDependencies": [
    // "vuetify"
    'vue-echarts',
    'resize-detector'
  ],
  css: {
    loaderOptions: {
      // scss: {
      //     prependData: `
      //     @import "~@/scss/_variables.scss";
      //   `
      // }
    }
  },
  publicPath:
  process.env.NODE_ENV === "production"
    ? "/DFAT-vue-dev/"
    : "/"
}