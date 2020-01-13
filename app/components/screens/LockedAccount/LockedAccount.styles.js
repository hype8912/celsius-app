import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width / 2,
    height: (width / 2) * 0.96,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LockedAccountModeStyle = () => getThemedStyle(base, themed);

export default LockedAccountModeStyle;
