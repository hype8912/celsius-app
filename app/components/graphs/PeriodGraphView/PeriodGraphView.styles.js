import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  periods: {
    height: heightPercentageToDP("5%"),
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: widthPercentageToDP("5.33%"),
    paddingRight: widthPercentageToDP("5.33%"),
    marginTop: heightPercentageToDP("2.02%"),
  },
  active: {
    marginTop: 5,
    width: widthPercentageToDP("3.5%"),
    borderTopColor: COLOR_KEYS.LINK,
    borderTopWidth: 1,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const PeriodGraphViewStyle = () => getThemedStyle(base, themed);

export default PeriodGraphViewStyle;
