import { Platform } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

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
      android: {
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
    paddingHorizontal: 10,
    marginBottom: 5,
  },
};

const themed = {
  light: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    selectWrapper: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
      ...Platform.select({
        android: {
          borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT),
        },
      }),
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
  },

  dark: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    selectWrapper: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
      ...Platform.select({
        android: {
          borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK),
        },
      }),
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
  },

  unicorn: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    selectWrapper: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
      ...Platform.select({
        android: {
          borderColor: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN),
        },
      }),
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
  },
};

const CoinPickerStyle = () => getThemedStyle(base, themed);

export default CoinPickerStyle;
