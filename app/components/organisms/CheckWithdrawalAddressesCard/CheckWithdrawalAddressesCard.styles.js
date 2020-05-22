// import STYLES from '../../../constants/STYLES';
import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const radius = Platform.OS === "ios" ? 20 : 24;
const base = {
  container: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width: heightPercentageToDP(radius),
    height: heightPercentageToDP(radius),
    borderRadius: heightPercentageToDP(radius / 2),
    paddingLeft: radius * 3,
    justifyContent: "center",
    alignItems: "center",
    left: -1 * heightPercentageToDP(radius / 2),
    top: -1 * heightPercentageToDP(radius / 4),
  },
  card: {
    overflow: "hidden",
    flexDirection: "row",
    height: heightPercentageToDP(radius / 2),
  },

  infoTextWrapper: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingVertical: 8,
    paddingRight: 12,
  },
  infoSubtitleWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CheckWithdrawalAddressesCardStyle = () => getThemedStyle(base, themed);

export default CheckWithdrawalAddressesCardStyle;
