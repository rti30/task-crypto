// vue.config.js
module.exports = {
   productionSourceMap: false,
   publicPath: process.env.NODE_ENV === 'production'
      ? ''
      : '/'
   ,
   css: {
      loaderOptions: {
         scss: {
            prependData: `@import "@/assets/style/_variables.scss";
               @import "@/assets/style/mixins.scss";
               `,

         },
      }
   },
}