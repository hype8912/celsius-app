import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND),
  },
  icon: {
    width: 34,
    resizeMode: "contain",
    marginTop: 0,
    marginLeft: 32,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const EmptyStateStyle = () => getThemedStyle(base, themed);

export default EmptyStateStyle;
