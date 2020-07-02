import { Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const { width, height } = Dimensions.get("window");

const base = {
  text: { margin: 20, justifyContent: "center", alignItems: "center" },
  wrapper: {
    margin: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: getColor(COLOR_KEYS.BACKGROUND),
    width,
    height,
  },
  image: { resizeMode: "contain", height: heightPercentageToDP("20%") },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BankToTheFutureModalStyle = () => getThemedStyle(base, themed);

export default BankToTheFutureModalStyle;
