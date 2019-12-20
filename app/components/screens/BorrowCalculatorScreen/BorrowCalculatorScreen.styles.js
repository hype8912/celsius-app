import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  cardStyle: {
    borderWidth: 1,
  },
  selectedCardStyle: {
    borderWidth: 1,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    borderColor: STYLES.COLORS.CELSIUS_BLUE,
    color: STYLES.COLORS.WHITE,
  },
  percentageTextStyle: {
    color: STYLES.COLORS.DARK_GRAY,
  },
  selectedTextStyle: {
    color: STYLES.COLORS.WHITE,
  },
  ltvWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  annualPercentage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

const themed = {
  light: {
    cardStyle: {
      backgroundColor: STYLES.COLORS.WHITE,
      borderColor: STYLES.COLORS.DARK_GRAY3,
    },
    percentageTextStyle: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    interestCardText: {
      color: STYLES.COLORS.MEDIUM_GRAY,
    },
  },
  dark: {
    cardStyle: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      borderColor: STYLES.COLORS.WHITE_OPACITY5,
    },
    percentageTextStyle: {
      color: STYLES.COLORS.MEDIUM_GRAY,
    },
    interestCardText: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {},
};

const LoanCalculatorStyle = () => getThemedStyle(base, themed);

export default LoanCalculatorStyle;
