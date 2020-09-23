import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  cardStyle: {
    borderWidth: 1,
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    borderColor: COLOR_KEYS.PARAGRAPH,
  },
  selectedCardStyle: {
    borderWidth: 1,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    borderColor: COLOR_KEYS.PRIMARY_BUTTON,
    color: COLOR_KEYS.CARDS,
  },
  percentageTextStyle: {
    color: COLOR_KEYS.PARAGRAPH,
  },
  selectWrapper: {
    paddingTop: 10,
  },
  selectedTextStyle: {
    color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
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
  separator: {
    color: COLOR_KEYS.SEPARATORS,
  },
  interestCardText: {
    color: COLOR_KEYS.LINK,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const LoanCalculatorStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default LoanCalculatorStyle;
