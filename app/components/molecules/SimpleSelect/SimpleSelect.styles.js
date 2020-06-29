// import STYLES from '../../../constants/STYLES';
import {
  getFontFamily,
  getFontSize,
  getThemedStyle,
} from "../../../utils/styles-util";
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
    fontSize: getFontSize("H2"),
    fontFamily: getFontFamily("regular"),
  },
  inputIOS: {
    fontSize: getFontSize("H2"),
    fontFamily: getFontFamily("regular"),
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
      color: STYLES.COLORS.WHITE,
    },
    inputIOS: {
      color: STYLES.COLORS.WHITE,
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
