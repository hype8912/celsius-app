import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    width: widthPercentageToDP("70%"),
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-evenly",
  },
  interests: {
    flex: 1,
    padding: 12,
  },
  interest: {
    flex: 0.5,
  },
  interestCel: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  info: {
    padding: 12,
  },
  progress: {
    justifyContent: "center",
  },
  loanTitle: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  loanInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  loanInfoAdditional: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  additionalInterestStyle: { marginBottom: 8 },
  choose: { opacity: 0.7 },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const LoanOverviewCardStyle = () => getThemedStyle(base, themed);

export default LoanOverviewCardStyle;
