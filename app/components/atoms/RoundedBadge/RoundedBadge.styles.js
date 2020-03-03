import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1
  }
};

const themed = {
  light: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  },

  dark: {
    container: {
      backgroundColor: STYLES.COLORS.DARK_HEADER     
    }
  },

  celsius: {}
};

const RoundedBadgeStyle = () => getThemedStyle(base, themed);

export default RoundedBadgeStyle;
