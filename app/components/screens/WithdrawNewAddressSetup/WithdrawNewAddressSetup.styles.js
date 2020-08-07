import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  scanText: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
    textAlign: "left",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WithdrawalNewAddressSetupStyle = () => getThemedStyle(base, themed);

export default WithdrawalNewAddressSetupStyle;
