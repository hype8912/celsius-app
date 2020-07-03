import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: getColor(COLOR_KEYS.NEUTRAL),
  },
  darkThemeButton: {
    backgroundColor: getColor(COLOR_KEYS.HEADER),
  },
  unicornThemeButton: {
    backgroundColor: "#ac35b6",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const AppearanceStyle = () => getThemedStyle(base, themed);

export default AppearanceStyle;
