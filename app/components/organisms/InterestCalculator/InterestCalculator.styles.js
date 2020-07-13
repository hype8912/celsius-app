import { StyleSheet } from "react-native";
import { getThemedStyle, getPadding } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  earningCard: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: COLOR_KEYS.HEADER,
    borderColor: COLOR_KEYS.PARAGRAPH,
  },
  amounts: {
    ...StyleSheet.flatten(getPadding("20 20 20 20")),
  },
  selectedCard: {
    backgroundColor: COLOR_KEYS.LINK,
    borderColor: COLOR_KEYS.LINK,
  },
  showInterestWrapper: {
    backgroundColor: COLOR_KEYS.HEADER,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const InterestCalculatorModalStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default InterestCalculatorModalStyle;
