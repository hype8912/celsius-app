import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  balance: {
    flex: 1,
  },
  text: {
    color: "#FFFF",
  },
  cardInnerView: {
    flexDirection: "row",
    marginHorizontal: 12,
  },
  wrapper: {
    width: "100%",
  },
  coinTextWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CoinCardStyle = () => getThemedStyle(base, themed);

export default CoinCardStyle;
