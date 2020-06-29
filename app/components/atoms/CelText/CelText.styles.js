import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  text: {
    fontFamily: "Barlow-Regular",
    color: getColor(COLOR_KEYS.HEADING_TEXT),
  },
};

const themed = {
  light: {},
  dark: {
    textColor: { color: getColor(COLOR_KEYS.NEUTRAL_LIGHT) },
    H1: { color: getColor(COLOR_KEYS.NEUTRAL) },
    H2: { color: getColor(COLOR_KEYS.NEUTRAL) },
    H3: { color: getColor(COLOR_KEYS.NEUTRAL) },
  },
  celsius: {},
};

const CelTextStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelTextStyle;
