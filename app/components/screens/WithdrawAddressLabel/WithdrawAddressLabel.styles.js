import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {},
  scanText: {},
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WithdrawAddressLabelStyle = () => getThemedStyle(base, themed);

export default WithdrawAddressLabelStyle;
