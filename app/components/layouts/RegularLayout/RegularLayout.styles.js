import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
  loaderView: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: "center",
  },
  noInternet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const RegularLayoutStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default RegularLayoutStyle;
