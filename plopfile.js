const componentGen = require("./plops/component/componentGen");
const reduxGen = require("./plops/redux/reduxGen");
const screenGen = require("./plops/screen/screenGen");
const serviceGen = require("./plops/service/serviceGen");
const utilGen = require("./plops/util/utilGen");
const versionGen = require("./plops/version/versionGen");

module.exports = function(plop) {
  plop.setGenerator("component", componentGen);
  plop.setGenerator("redux", reduxGen);
  plop.setGenerator("screen", screenGen);
  plop.setGenerator("service", serviceGen);
  plop.setGenerator("util", utilGen);
  plop.setGenerator("version", versionGen);
};
