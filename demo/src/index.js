// @flow

import React from "react";
import { render } from "react-dom";
import App from "./App";

const demoNode = document.querySelector("#demo");

if (demoNode) {
  render(<App />, demoNode)
}

function addScript(url) {
  var script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

addScript("//code.jquery.com/jquery-3.4.1.min.js");