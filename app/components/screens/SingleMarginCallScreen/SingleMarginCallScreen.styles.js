// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {
    card: { color: "#F3F3F3" },
  },

  dark: {
    card: { color: STYLES.COLORS.MEDIUM_GRAY },
  },

  celsius: {},
};

const SingleMarginCallScreenStyle = () => getThemedStyle(base, themed);

export default SingleMarginCallScreenStyle;
