import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
    height: 50,
    transform: [
      {
        translateY: 0.5,
      },
    ],
  },
  buttonStyle: {
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  secondaryButtonStyle: {
    color: STYLES.COLORS.DARK_GRAY,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
  redButtonStyle: {
    color: STYLES.COLORS.WHITE,
    backgroundColor: STYLES.COLORS.RED,
  },
  disabledButtonStyle: {
    color: STYLES.COLORS.WHITE,
    backgroundColor: STYLES.COLORS.MEDIUM_GRAY5,
  },
  greenButtonStyle: {
    color: STYLES.COLORS.WHITE,
    backgroundColor: STYLES.COLORS.GREEN,
  },
  whiteButtonStyle: {
    color: STYLES.COLORS.DARK_GRAY,
    backgroundColor: STYLES.COLORS.WHITE,
  },
  defaultButtonStyle: {
    color: STYLES.COLORS.WHITE,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
  },
};

const themed = {
  light: {},

  dark: {
    secondaryButtonStyle: {
      color: STYLES.COLORS.WHITE,
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
    redButtonStyle: {
      color: STYLES.COLORS.RED,
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
    disabledButtonStyle: {
      color: STYLES.COLORS.MEDIUM_GRAY,
      backgroundColor: STYLES.COLORS.DARK_GRAY5,
    },
    greenButtonStyle: {
      color: STYLES.COLORS.WHITE,
      backgroundColor: STYLES.COLORS.GREEN,
    },
    whiteButtonStyle: {
      color: STYLES.COLORS.WHITE,
      backgroundColor: STYLES.COLORS.WHITE,
    },
    defaultButtonStyle: {
      color: STYLES.COLORS.WHITE,
      backgroundColor: STYLES.COLORS.DARK_BUTTON_GRAY,
    },
  },

  unicorn: {},
};

const CelModalButtonStyle = () => getThemedStyle(base, themed);

export default CelModalButtonStyle;
