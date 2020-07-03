import {
  getColor,
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

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
    borderTopColor: "rgba(65,86,166,1)",
    borderTopWidth: 1,
  },
};

const themed = {
  light: {
    active: { borderTopColor: getColor(COLOR_KEYS.LINK, THEMES.LIGHT) },
  },

  dark: {
    active: { borderTopColor: getColor(COLOR_KEYS.LINK, THEMES.DARK) },
  },

  unicorn: {
    active: { borderTopColor: getColor(COLOR_KEYS.LINK, THEMES.UNICORN) },
  },
};

const PeriodGraphViewStyle = () => getThemedStyle(base, themed);

export default PeriodGraphViewStyle;
