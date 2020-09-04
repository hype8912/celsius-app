import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "46%",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WalletDetailsCardStyle = () => getThemedStyle(base, themed);

export default WalletDetailsCardStyle;
