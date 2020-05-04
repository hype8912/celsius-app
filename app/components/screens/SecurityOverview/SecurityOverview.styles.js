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
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignContent: 'right',
    alignItems: "flex-end",
    margin: 12,
  },
  userActionsLogWrapper: {
    marginTop: 10,
  },
  userActionsLog: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "flex-start",
  },
  accountActionsLogWrapper: {
    marginTop: 5,
    alignItems: "center",
  },
  accountActionsLog: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  accountActionsLog1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
    alignItems: "flex-start",
    // alignSelf: 'center',
  },
  accountActionsLog2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  accountActionsLog3: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  renderDeviceWrapper: {
    marginTop: 10,
  },
  renderDevice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "center",
    alignSelf: "center",
  },
  renderDeviceModel: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },
  renderDeviceCity: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: "flex-end",
  },
  infoTextWrapper: {
    width: "100%",
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

const SecurityOverviewStyle = () => getThemedStyle(base, themed);

export default SecurityOverviewStyle;
