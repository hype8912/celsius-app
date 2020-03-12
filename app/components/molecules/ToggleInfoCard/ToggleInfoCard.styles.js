// import STYLES from '../../../constants/STYLES';
import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width:
      Platform.OS === "ios"
        ? heightPercentageToDP("12%")
        : heightPercentageToDP("20%"),
    height:
      Platform.OS === "ios"
        ? heightPercentageToDP("12%")
        : heightPercentageToDP("20%"),
    borderRadius:
      Platform.OS === "ios"
        ? heightPercentageToDP("6%")
        : heightPercentageToDP("10%"),
    justifyContent: "center",
    alignItems: "stretch",
    left: -25,
    bottom: Platform.OS === "ios" ? -12 : -25,
  },
  card: {
    overflow: "hidden",
    flexDirection: "row",
  },
  toggleWrapper: {
    flexDirection: "column",
    width: heightPercentageToDP("14%"),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignContent: 'right',
    alignItems: "flex-end",
    margin: 12,
  },

  infoSubtitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ToggleInfoCardStyle = () => getThemedStyle(base, themed);

export default ToggleInfoCardStyle;
