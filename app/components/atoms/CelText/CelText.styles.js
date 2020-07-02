import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  text: {
    fontFamily: "Barlow-Regular",
    color: getColor(COLOR_KEYS.PARAGRAPH),
  },
  H1: {
    color: getColor(COLOR_KEYS.HEADLINE),
  },
  H2: {
    color: getColor(COLOR_KEYS.HEADLINE),
  },
  H3: {
    color: getColor(COLOR_KEYS.HEADLINE),
  },
  link: {
    color: getColor(COLOR_KEYS.LINK),
  },
};

const themed = {
  light: {},
  dark: {},
  celsius: {},
};

const CelTextStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelTextStyle;
