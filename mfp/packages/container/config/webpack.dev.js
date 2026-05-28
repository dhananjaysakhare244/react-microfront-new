const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const { getDevelopmentRemotes, getRemoteAssetProxy } = require("./remotes");

module.exports = async () => {
  const remotes = await getDevelopmentRemotes();
  const proxy = getRemoteAssetProxy();

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
      proxy,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        remotes,
        shared: packageJson.dependencies,
      }),
    ],
  };

  return merge(commonConfig, devConfig);
};
