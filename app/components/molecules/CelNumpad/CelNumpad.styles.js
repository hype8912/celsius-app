// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width, height } = Dimensions.get("window");

// TODO: make responsive
const base = {
  container: {
    width,
    height: 240,

    position: "absolute",
    zIndex: 200,
    top: height - 400,
    left: 0,

    alignItems: "center",
    justifyContent: "center",
  },
  buttonsWrapper: {
    width: 240,
    height: 240,
  },
  buttonsRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 60,
    width: 60,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CelNumpadStyle = () => getThemedStyle(base, themed);

export default CelNumpadStyle;
