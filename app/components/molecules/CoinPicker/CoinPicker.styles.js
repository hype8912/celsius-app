import { Platform } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  coinPicking: {
    alignSelf: "center",
  },
  circleButton: {
    marginBottom: 0,
    marginTop: 20,
  },
  circleWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: STYLES.COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: -1,
    backgroundColor: "white",
  },
  iconStyle: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selectWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: "auto",
    alignItems: "center",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
    backgroundColor: COLOR_KEYS.CARDS,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  iconColor: { color: COLOR_KEYS.PARAGRAPH },
};

const themed = {
  light: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },

  dark: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  unicorn: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },
};

const CoinPickerStyle = () => getThemedStyle(base, themed);

export default CoinPickerStyle;
