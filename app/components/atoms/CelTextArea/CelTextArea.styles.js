import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    container: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    iconColor: {
      color: STYLES.COLORS.WHITE_OPACITY3,
    },
    textColor: {
      color: STYLES.COLORS.WHITE,
    },
  },

  celsius: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },
};

const CelTextAreaStyle = () => getThemedStyle(base, themed);

export default CelTextAreaStyle;
