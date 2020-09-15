import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  iconFill: { color: COLOR_KEYS.CARDS },
  fillColor: { color: COLOR_KEYS.HEADLINE },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const PerCoinCelInterestCardStyle = () => getThemedStyle(base, themed);

export default PerCoinCelInterestCardStyle;
