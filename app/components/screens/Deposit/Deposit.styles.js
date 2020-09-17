import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },

  loader: {
    marginBottom: 50,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  rateInfoCard: {
    marginHorizontal: 20,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const DepositStyle = () => getThemedStyle(base, themed);

export default DepositStyle;
