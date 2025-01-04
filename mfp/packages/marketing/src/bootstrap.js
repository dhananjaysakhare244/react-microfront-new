import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  //send out a notification to container that navigation happened in marketing
  if (onNavigate) history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = history.location;
      if (pathname !== nextPathName) history.push(nextPathName);
    },
  };
};

// we are running locally on dev mode
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// we are running through container
export { mount };
