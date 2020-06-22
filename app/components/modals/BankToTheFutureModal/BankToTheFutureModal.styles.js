// import STYLES from ‘../../../constants/STYLES’;
import { Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const { width, height } = Dimensions.get("window");

const base = {
  text: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 20,
  },
  wrapper: {
    margin: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width,
    height,
  },
  image: { resizeMode: "contain", height: heightPercentageToDP("20%") },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BankToTheFutureModalStyle = () => getThemedStyle(base, themed);

export default BankToTheFutureModalStyle;
