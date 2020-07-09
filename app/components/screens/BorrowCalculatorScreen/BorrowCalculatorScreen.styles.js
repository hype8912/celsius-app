import STYLES from "../../../constants/STYLES";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
  },
  cardStyle: {
    borderWidth: 1,
  },
  selectedCardStyle: {
    borderWidth: 1,
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
    selectedCardStyle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.LIGHT),
      borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.LIGHT),
      color: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
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

  unicorn: {},
};

const LoanCalculatorStyle = () => getThemedStyle(base, themed);

export default LoanCalculatorStyle;
