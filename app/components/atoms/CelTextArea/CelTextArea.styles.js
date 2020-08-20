import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    backgroundColor: COLOR_KEYS.CIRCLE_ICON_BACKGROUND,
  },
  iconColor: {
    color: COLOR_KEYS.TOGGLE_OFF_FOREGROUND,
  },
  textColor: {
    color: COLOR_KEYS.HEADLINE,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelTextAreaStyle = () => getThemedStyle(base, themed);

export default CelTextAreaStyle;
