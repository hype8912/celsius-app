const componentGen = require('./plops/component/componentGen');
const screenGen = require('./plops/screen/screenGen');
const utilGen = require('./plops/util/utilGen');
const serviceGen = require('./plops/service/serviceGen');
const reduxGen = require('./plops/redux/reduxGen');

module.exports = function (plop) {
  plop.setGenerator('Component', componentGen);
  plop.setGenerator('Util', utilGen);
  plop.setGenerator('Service', serviceGen);
  plop.setGenerator('Redux', reduxGen);
  plop.setGenerator('Screen', screenGen);
};
