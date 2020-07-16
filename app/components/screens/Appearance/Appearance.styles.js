import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  coinContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
  },
  themeBtn: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  lightThemeButton: {
    backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
  },
  darkThemeButton: {
    backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
  },
  unicornThemeButton: {
    backgroundColor: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const AppearanceStyle = () => getThemedStyle(base, themed);

export default AppearanceStyle;
