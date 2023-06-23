const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externalsType: "script",
    externals: {
      ymaps3: [
        "https://api-maps.yandex.ru/3.0/?apikey=99bd05cf-19ea-45d7-aa66-729605050681&lang=ru_RU",
        "ymaps3",
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/styles.scss";`,
      },
    },
  },
});
