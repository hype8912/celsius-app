import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginVertical: 5,
    flex: 0.8,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const LoanInterestCardStyle = () => getThemedStyle(base, themed);

export default LoanInterestCardStyle;
