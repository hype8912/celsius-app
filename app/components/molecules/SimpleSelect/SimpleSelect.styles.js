// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  inputAndroidContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "auto",
    alignItems: "center",
  },
  inputIOSContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "auto",
    alignItems: "center",
  },
  inputAndroid: {
    fontSize: 26,
    fontFamily: "Barlow-Regular",
  },
  inputIOS: {
    fontSize: 26,
    fontFamily: "Barlow-Regular",
  },
  iconContainer: {
    position: "relative",
    marginLeft: 10,
  },
};

const themed = {
  light: {
    inputAndroid: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    inputIOS: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    inputAndroid: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    inputIOS: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  celsius: {
    inputAndroid: {
      color: STYLES.COLORS.DARK_GRAY,
    },
    inputIOS: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },
};

const SimpleSelectStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default SimpleSelectStyle;
