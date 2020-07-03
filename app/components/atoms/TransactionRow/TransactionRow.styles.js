import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  amounts: {
    marginLeft: 10,
  },
  statusText: {
    marginBottom: 5,
  },
  circle: {
    width: widthPercentageToDP("7%"),
    height: widthPercentageToDP("7%"),
    borderRadius: widthPercentageToDP("7%") / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TransactionRowStyle = () => getThemedStyle(base, themed);

export default TransactionRowStyle;
