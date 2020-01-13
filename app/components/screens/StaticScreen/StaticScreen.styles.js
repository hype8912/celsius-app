import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { height } = Dimensions.get("window");

const base = {
  wrapper: {
    flex: 1,
    minHeight: 0.8 * height,
    alignItems: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const StaticScreenStyle = () => getThemedStyle(base, themed);

export default StaticScreenStyle;
