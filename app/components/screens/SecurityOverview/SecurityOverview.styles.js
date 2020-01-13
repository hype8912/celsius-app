// import STYLES from '../../../constants/STYLES';
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
    width: heightPercentageToDP("18%"),
    height: heightPercentageToDP("18%"),
    borderRadius: heightPercentageToDP("9%"),
    justifyContent: "center",
    alignItems: "stretch",
    left: -25,
    bottom: -25,
  },
  card: {
    overflow: "hidden",
    flexDirection: "row",
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
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SecurityOverviewStyle = () => getThemedStyle(base, themed);

export default SecurityOverviewStyle;
