// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    // flexDirection: "row",
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
    card: { color: "#F3F3F3" },
  },

  dark: {
    card: { color: STYLES.COLORS.MEDIUM_GRAY },
  },

  celsius: {},
};

const LoanOverviewCardStyle = () => getThemedStyle(base, themed);

export default LoanOverviewCardStyle;
