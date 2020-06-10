import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const { width, height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  blueStaticContainer: {
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    width,
    height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blueContainer: {
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
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
    width: "100%",
    height: 65,
  },
  celsiusNetworkImage: {
    width: "100%",
    height: 65,
    marginBottom: 30,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SplashScreenStyle = () => getThemedStyle(base, themed);

export default SplashScreenStyle;
