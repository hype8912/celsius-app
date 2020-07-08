import {
  getColor,
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
    width: widthPercentageToDP("70%"),
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-evenly",
  },
  interests: {
    flex: 1,
    padding: 12,
  },
  interest: {
    flex: 0.5,
  },
  interestCel: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
    padding: 12,
  },
  progress: {
    justifyContent: "center",
  },
};

const themed = {
  light: {
    card: { color: getColor(COLOR_KEYS.BACKGROUND, THEMES.LIGHT) },
  },

  dark: {
    card: { color: getColor(COLOR_KEYS.BACKGROUND, THEMES.DARK) },
  },

  unicorn: {
    card: { color: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN) },
  },
};

const LoanOverviewCardStyle = () => getThemedStyle(base, themed);

export default LoanOverviewCardStyle;
