import { Dimensions } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const { width, height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN),
  },
  blueStaticContainer: {
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
    width,
    height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blueContainer: {
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
    zIndex: 1,
    borderRadius: 10,
    width,
    height,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
  },
  logoStaticImage: {
    width: 70,
    height: 70,
  },
  logoContainer: {
    flexDirection: "row",
    zIndex: 2,
    width: 70,
    height: 70,
  },
  image: {
    flex: 1,
  },
  celsiusNetworkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    height: 65,
  },
  celsiusNetworkImage: {
    height: 65,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const SplashScreenStyle = () => getThemedStyle(base, themed);

export default SplashScreenStyle;
