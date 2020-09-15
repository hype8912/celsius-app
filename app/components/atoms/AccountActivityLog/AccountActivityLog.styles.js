import { getThemedStyle } from "../../../utils/styles-util";

const base = {
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
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const AccountActivityLogStyle = () => getThemedStyle(base, themed);

export default AccountActivityLogStyle;
