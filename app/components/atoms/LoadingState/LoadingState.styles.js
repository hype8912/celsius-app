import { Dimensions } from "react-native";

// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const { height } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 0.8 * height
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const LoadingStateStyle = () => getThemedStyle(base, themed);

export default LoadingStateStyle;
