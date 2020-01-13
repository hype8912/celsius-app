// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  caretWrapper: {
    alignItems: "center",
    height: 30,
    position: "absolute",
    width: "100%",
  },
};

const themed = {
  light: {
    gradientColor: {
      color: STYLES.COLORS.WHITE,
    },
    iconFill: {
      color: "#e2e4e6",
    },
  },

  dark: {
    gradientColor: {
      color: STYLES.COLORS.DARK_HEADER,
    },
    iconFill: {
      color: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  celsius: {},
};

const ScrollMoreStyle = () => getThemedStyle(base, themed);

export default ScrollMoreStyle;
