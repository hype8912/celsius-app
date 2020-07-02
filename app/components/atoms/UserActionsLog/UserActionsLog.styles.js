import { getThemedStyle } from "../../../utils/styles-util";

const base = {
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
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const UserActionsLogStyle = () => getThemedStyle(base, themed);

export default UserActionsLogStyle;
