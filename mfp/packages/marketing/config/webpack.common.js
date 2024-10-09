module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // this will make sure that babel will look for either .mjs or .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // adds additional code in our project handling jsx code of react
            plugins: ["@babel/plugin-transform-runtime"], // adds additional code to enable new syntax like async await
          },
        },
      },
    ],
  },
};
