import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  text: { color: COLOR_KEYS.PARAGRAPH },
  H1: { color: COLOR_KEYS.HEADLINE },
  H2: { color: COLOR_KEYS.HEADLINE },
  H3: { color: COLOR_KEYS.HEADLINE },
  link: { color: COLOR_KEYS.LINK },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CelTextStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelTextStyle;
