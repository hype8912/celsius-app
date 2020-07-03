import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {};

const themed = {
  light: {
    text: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
    H1: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    H2: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    H3: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    link: { color: getColor(COLOR_KEYS.LINK, THEMES.LIGHT) },
  },
  dark: {
    text: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
    H1: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    H2: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    H3: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    link: { color: getColor(COLOR_KEYS.LINK, THEMES.DARK) },
  },
  unicorn: {
    text: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
    H1: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    H2: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    H3: { color: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    link: { color: getColor(COLOR_KEYS.LINK, THEMES.UNICORN) },
  },
};

const CelTextStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelTextStyle;
