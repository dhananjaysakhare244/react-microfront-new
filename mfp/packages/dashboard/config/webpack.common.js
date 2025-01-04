const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extension: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svh|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.scss|\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/, // this will make sure that babel will look for either .mjs or .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // adds additional code in our project handling jsx code of react
            plugins: ["@babel/plugin-transform-runtime"], // adds additional code to enable new syntax like async await
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
