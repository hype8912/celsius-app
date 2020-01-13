// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { height } = Dimensions.get("window");

const base = {
  container: {
    height: height - 150, // 150 height of heading and un-scrollable header
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ContactListStyle = () => getThemedStyle(base, themed);

export default ContactListStyle;
