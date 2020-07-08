import {
  getColor,
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
  },
  innerCircle: {
    position: "absolute",
    top: heightPercentageToDP("0.6%"),
    left: heightPercentageToDP("0.5%"),
    width: heightPercentageToDP("13.8%"),
    height: heightPercentageToDP("13.8%"),
    borderRadius: heightPercentageToDP("13.8%") / 2,
  },
  contentCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: heightPercentageToDP("1.5%"),
    left: heightPercentageToDP("1.45%"),
    width: heightPercentageToDP("12.1%"),
    height: heightPercentageToDP("12.1%"),
    borderRadius: heightPercentageToDP("12.1%") / 2,
  },
};

const themed = {
  light: {
    progressBackground: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
    },
  },

  dark: {
    progressBackground: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
    },
  },

  unicorn: {
    progressBackground: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
    },
  },
};

const CircularProgressBarStyle = () => getThemedStyle(base, themed);

export default CircularProgressBarStyle;
