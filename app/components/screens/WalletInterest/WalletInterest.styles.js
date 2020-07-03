import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20,
  },
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  rateInfoCard: { marginTop: 50, marginHorizontal: 20 },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WalletInterestStyle = () => getThemedStyle(base, themed);

export default WalletInterestStyle;
