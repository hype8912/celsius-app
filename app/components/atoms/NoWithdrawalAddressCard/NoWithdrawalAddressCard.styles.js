import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  bodyWrapper: {
    flexDirection: "row",
    marginVertical: 7,
  },
  cardBody: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  size: { height: 35, width: 35 },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const NoWithdrawalAddressCardStyle = () => getThemedStyle(base, themed);

export default NoWithdrawalAddressCardStyle;
