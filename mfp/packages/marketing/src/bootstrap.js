import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// we are running locally on dev mode
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) mount(devRoot);
}

// we are running through container
export { mount };
