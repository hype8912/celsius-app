import loggerUtil from "./logger-util";

// TODO add JSDoc
/* eslint-disable */
const defaultErrorHandler = ErrorUtils.getGlobalHandler();
const myErrorHandler = (e, isFatal) => {
  loggerUtil.err({ ...e, where: "defaultErrorHandler" }, isFatal);
  defaultErrorHandler(e, isFatal);
};
ErrorUtils.setGlobalHandler(myErrorHandler);
/* eslint-enable */

export default err => loggerUtil.err({ ...err, where: "export" });
