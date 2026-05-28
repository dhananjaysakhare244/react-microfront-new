const fs = require("fs");
const net = require("net");
const path = require("path");

const remoteApps = [
  { scope: "marketing", localPort: 5001, path: "marketing" },
  { scope: "auth", localPort: 5002, path: "auth" },
  { scope: "dashboard", localPort: 5003, path: "dashboard" },
];

const remoteDomainFile = path.resolve(__dirname, "remote-domain.txt");

const getRemoteDomain = () => {
  if (!fs.existsSync(remoteDomainFile)) {
    return "";
  }

  return fs
    .readFileSync(remoteDomainFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#"))
    ?.replace(/\/$/, "");
};

const canConnect = (port, host) =>
  new Promise((resolve) => {
    const socket = new net.Socket();

    const done = (isOpen) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(isOpen);
    };

    socket.setTimeout(300);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
    socket.connect(port, host);
  });

const isLocalRemoteRunning = async (port) =>
  await canConnect(port, "127.0.0.1");

const getLocalUrl = ({ localPort }) =>
  `http://localhost:${localPort}/remoteEntry.js`;

const getRemoteUrl = ({ scope, path }) => {
  const remoteDomain = getRemoteDomain();

  if (!remoteDomain) {
    throw new Error(
      `No remote domain configured for ${scope}. Add it to ${remoteDomainFile}.`,
    );
  }

  return `${remoteDomain}/${path}/latest/remoteEntry.js`;
};

const getRemoteDefinition = (app, url) => `${app.scope}@${url}`;

const getRuntimeRemoteDefinition = (app) => {
  const localUrl = getLocalUrl(app);
  const remoteUrl = getRemoteUrl(app);

  return `promise new Promise((resolve, reject) => {
    const scope = ${JSON.stringify(app.scope)};
    const urls = [${JSON.stringify(localUrl)}, ${JSON.stringify(remoteUrl)}];

    const resolveContainer = () => {
      const container = window[scope];

      if (!container) {
        reject(new Error("Remote " + scope + " loaded but was not available on window."));
        return;
      }

      resolve({
        get: container.get.bind(container),
        init: (shareScope) => {
          try {
            return container.init(shareScope);
          } catch (error) {
            return undefined;
          }
        },
      });
    };

    const loadRemote = (index) => {
      const url = urls[index];

      if (!url) {
        reject(new Error("Failed to load remote " + scope + " from localhost and remote domain."));
        return;
      }

      if (window[scope]) {
        resolveContainer();
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.async = true;
      script.onload = resolveContainer;
      script.onerror = () => loadRemote(index + 1);
      document.head.appendChild(script);
    };

    loadRemote(0);
  })`;
};

const getProductionRemotes = () =>
  Object.fromEntries(
    remoteApps.map((app) => [
      app.scope,
      getRemoteDefinition(app, getRemoteUrl(app)),
    ]),
  );

const getDevelopmentRemotes = async () => {
  const remotes = await Promise.all(
    remoteApps.map(async (app) => {
      const localRemoteRunning = await isLocalRemoteRunning(app.localPort);

      console.log(
        `[module-federation] ${app.scope} local status -> ${
          localRemoteRunning ? "local" : "remote"
        }. Browser will try ${getLocalUrl(app)} before ${getRemoteUrl(app)}`,
      );

      return [app.scope, getRuntimeRemoteDefinition(app)];
    }),
  );

  return Object.fromEntries(remotes);
};

const getRemoteAssetProxy = () => {
  const remoteDomain = getRemoteDomain();

  if (!remoteDomain) {
    return {};
  }

  return Object.fromEntries(
    remoteApps.map((app) => [
      `/${app.path}/latest`,
      {
        target: remoteDomain,
        changeOrigin: true,
        secure: false,
      },
    ])
  );
};

module.exports = {
  getDevelopmentRemotes,
  getProductionRemotes,
  getRemoteAssetProxy,
};
