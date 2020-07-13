import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
  card: {
    color: COLOR_KEYS.BACKGROUND,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const LoanOverviewCardStyle = () => getThemedStyle(base, themed);

export default LoanOverviewCardStyle;
