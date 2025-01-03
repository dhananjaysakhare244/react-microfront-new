import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { createMemoryHistory } from "history";

const mount = (el, { onNavigate }) => {
  const history = createMemoryHistory();

  //send out a notification to container that navigation happened in marketing
  if (onNavigate) history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);
};

// we are running locally on dev mode
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) mount(devRoot, {});
}

// we are running through container
export { mount };
