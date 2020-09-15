import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  renderDeviceWrapper: {
    marginTop: 10,
  },
  renderDevice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "center",
    alignSelf: "center",
  },
  renderDeviceModel: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },
  renderLeftSide: {
    flex: 1,
    flexDirection: "column",
  },
  renderDeviceDate: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoginDevicesLogStyle = () => getThemedStyle(base, themed);

export default LoginDevicesLogStyle;
