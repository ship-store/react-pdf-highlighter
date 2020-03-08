// @flow

import React from "react";
import { render } from "react-dom";
import App from "./App";

const demoNode = document.querySelector("#app");

if (demoNode) {
  render(<App />, demoNode);
}
