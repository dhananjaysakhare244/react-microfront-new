const { merge } = require("webpack-merge");
const path = require("path");
const chokidar = require("chokidar");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const remoteSourcePaths = [
  path.resolve(__dirname, "../../marketing/src"),
  path.resolve(__dirname, "../../auth/src"),
  path.resolve(__dirname, "../../dashboard/src"),
];

const reloadContainerOnRemoteChange = (server) => {
  let reloadTimer;

  return () => {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      console.log("[container] Remote source changed. Reloading host page.");
      server.sockWrite(server.sockets, "content-changed");
    }, 1500);
  };
};

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:5000/",
  },
  devServer: {
    port: "5000",
    public: "localhost:5000",
    hot: false,
    liveReload: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    headers: {
      "Cache-Control": "no-store",
    },
    historyApiFallback: {
      index: "/index.html",
    },
    before(app, server) {
      const requestReload = reloadContainerOnRemoteChange(server);

      chokidar
        .watch(remoteSourcePaths, { ignoreInitial: true })
        .on("all", requestReload);
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
