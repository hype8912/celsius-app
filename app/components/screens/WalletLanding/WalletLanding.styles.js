import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  flexWrapper: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  depositWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  depositedCoins: {
    alignSelf: "center",
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 6,
  },
  listView: {
    marginLeft: 16,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WalletLandingStyle = () => getThemedStyle(base, themed);

export default WalletLandingStyle;
