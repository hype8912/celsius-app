import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  wrapper: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InterestCalculatorScreenStyle = () => getThemedStyle(base, themed);

export default InterestCalculatorScreenStyle;
