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
  marginRequired: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
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

const CoinCardStyle = () => getThemedStyle(base, themed);

export default CoinCardStyle;
