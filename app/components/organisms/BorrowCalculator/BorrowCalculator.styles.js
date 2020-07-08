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
  selectWrapper: {
    paddingTop: 10,
  },
  selectedTextStyle: {
    color: STYLES.COLORS.WHITE,
  },
  ltvWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  annualPercentage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  interestCardWrapper: {
    backgroundColor: STYLES.COLORS.SEMI_GRAY,
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
  },
  interestCardTitle: {
    marginVertical: 5,
  },
  interestCardItems: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  interestCardItem: {},
};

const themed = {
  light: {
    separator: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.LIGHT),
    },
    cardStyle: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.LIGHT),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT),
    },
    percentageTextStyle: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT),
    },
    interestCardText: {
      color: getColor(COLOR_KEYS.LINK, THEMES.LIGHT),
    },
  },
  dark: {
    separator: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.DARK),
    },
    cardStyle: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.DARK),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK),
    },
    percentageTextStyle: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK),
    },
    interestCardText: {
      color: getColor(COLOR_KEYS.LINK, THEMES.DARK),
    },
    selectedCardStyle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.DARK),
      borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.DARK),
      color: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
    },
  },

  unicorn: {
    separator: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.UNICORN),
    },
    cardStyle: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.UNICORN),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN),
    },
    percentageTextStyle: {
      color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN),
    },
    interestCardText: {
      color: getColor(COLOR_KEYS.LINK, THEMES.UNICORN),
    },
    selectedCardStyle: {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
      borderColor: getColor(COLOR_KEYS.PRIMARY_BUTTON, THEMES.UNICORN),
      color: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
    },
  },
};

const LoanCalculatorStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default LoanCalculatorStyle;
