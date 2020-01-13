// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const VerifyProfileStyle = () => getThemedStyle(base, themed);

export default VerifyProfileStyle;
