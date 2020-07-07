import { StyleSheet } from "react-native";
import {
  getThemedStyle,
  getPadding,
  getColor,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
  },
  earningCard: {
    flex: 1,
    borderWidth: 1,
  },
  amounts: {
    ...StyleSheet.flatten(getPadding("20 20 20 20")),
  },
};

const themed = {
  light: {
    earningCard: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.LIGHT),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT),
    },
    selectedCard: {
      backgroundColor: getColor(COLOR_KEYS.LINK, THEMES.LIGHT),
      borderColor: getColor(COLOR_KEYS.LINK, THEMES.LIGHT),
    },
    // amounts: {
    //   backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
    // },
    // calculatorInfo: {
    //   color: STYLES.COLORS.MEDIUM_GRAY,
    // },
    showInterestWrapper: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.LIGHT),
    },
  },

  dark: {
    earningCard: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.DARK),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK),
    },
    selectedCard: {
      backgroundColor: getColor(COLOR_KEYS.LINK, THEMES.DARK),
      borderColor: getColor(COLOR_KEYS.LINK, THEMES.DARK),
    },
    // amounts: {
    //   backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
    // },
    // calculatorInfo: {
    //   color: STYLES.COLORS.MEDIUM_GRAY,
    // },
    showInterestWrapper: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.DARK),
    },
  },

  unicorn: {
    earningCard: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.UNICORN),
      borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN),
    },
    selectedCard: {
      backgroundColor: getColor(COLOR_KEYS.LINK, THEMES.UNICORN),
      borderColor: getColor(COLOR_KEYS.LINK, THEMES.UNICORN),
    },
    // amounts: {
    //   backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
    // },
    // calculatorInfo: {
    //   color: STYLES.COLORS.MEDIUM_GRAY,
    // },
    showInterestWrapper: {
      backgroundColor: getColor(COLOR_KEYS.HEADER, THEMES.UNICORN),
    },
  },
};

const InterestCalculatorModalStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default InterestCalculatorModalStyle;
