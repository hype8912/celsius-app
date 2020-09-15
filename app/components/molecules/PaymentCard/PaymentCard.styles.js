import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

// import { FONT_SCALE } from "../../../config/constants/style";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  coinInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginVertical: 5,
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marginRequired: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: STYLES.COLORS.RED,
  },
  buttonsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
};

const themed = {
  light: {
    card: { color: "#F3F3F3" },
    cardStyle: {
      color: STYLES.COLORS.WHITE_OPACITY7,
    },
    background: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    card: { color: STYLES.COLORS.MEDIUM_GRAY },
    cardStyle: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
    background: {
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
  },

  unicorn: {},
};

const CoinCardStyle = () => getThemedStyle(base, themed);

export default CoinCardStyle;
