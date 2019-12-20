/**
 * @format
 */

import { AppRegistry } from "react-native";
/* eslint-disable no-unused-vars */

import App from "./app/App";
import { name as appName } from "./app.json";

/* eslint-disable no-undef */
if (__DEV__) {
  import("./app/utils/reactotron-util");
}

AppRegistry.registerComponent(appName, () => App);
