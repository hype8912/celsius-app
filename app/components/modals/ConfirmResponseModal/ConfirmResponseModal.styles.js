// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
  },
  card: {
    marginHorizontal: 20,
  },
};

const themed = {
  light: {
    background: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    background: {
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
  },

  celsius: {},
};

const ConfirmResponseModalStyle = () => getThemedStyle(base, themed);

export default ConfirmResponseModalStyle;
