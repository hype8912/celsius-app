import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  text: {
    fontFamily: "Barlow-Regular",
  },
};

const themed = {
  light: {
    textColor: {
      color: STYLES.COLORS.DARK_GRAY, // medium_gray je bilo 30.01.
    },
  },
  dark: {
    textColor: { color: STYLES.COLORS.WHITE_OPACITY5 },
    H1: { color: STYLES.COLORS.WHITE },
    H2: { color: STYLES.COLORS.WHITE },
    H3: { color: STYLES.COLORS.WHITE },
  },
  celsius: {
    textColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },
};

const CelTextStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CelTextStyle;
