import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  installmentsWrapper: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
};

const themed = {
  light: {
    installmentsWrapper: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    installmentsWrapper: {
      backgroundColor: STYLES.COLORS.DARK_BACKGROUND,
    },
  },

  unicorn: {},
};

const InterestDueModalStyle = () => getThemedStyle(base, themed);

export default InterestDueModalStyle;
