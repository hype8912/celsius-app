import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  selectedAmountText: {
    color: COLOR_KEYS.PRIMARY_BUTTON,
    borderBottomWidth: 1,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const PredefinedAmountsStyle = () => getThemedStyle(base, themed);

export default PredefinedAmountsStyle;
