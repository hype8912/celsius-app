import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

// import { FONT_SCALE } from "../../../config/constants/style";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginVertical: 5,
    flex: 0.8,
  },
};

const themed = {
  light: {
    cardStyle: {
      color: STYLES.COLORS.WHITE_OPACITY7,
    },
  },

  dark: {
    cardStyle: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
  },

  celsius: {},
};

const LoanInterestCardStyle = () => getThemedStyle(base, themed);

export default LoanInterestCardStyle;
