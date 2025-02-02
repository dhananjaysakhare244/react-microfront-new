const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:5000/",
  },
  devServer: {
    port: "5000",
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:5001/remoteEntry.js",
        auth: "auth@http://localhost:5002/remoteEntry.js",
        dashboard: "dashboard@http://localhost:5003/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
