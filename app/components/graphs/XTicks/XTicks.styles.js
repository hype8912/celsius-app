import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const width = widthPercentageToDP("100%");

const base = {
  xValues: {
    width,
    height: heightPercentageToDP("5%"),
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const XTicksStyle = () => getThemedStyle(base, themed);

export default XTicksStyle;
