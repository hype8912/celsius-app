import {
  getFontFamily,
  getFontSize,
  getThemedStyle,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    color: COLOR_KEYS.PARAGRAPH,
  },
  inputIOS: {
    fontSize: getFontSize("H2"),
    color: COLOR_KEYS.PARAGRAPH,
  },
  iconContainer: {
    position: "relative",
    marginLeft: 10,
  },
};

const themed = {
  light: {
    inputAndroid: {
      fontFamily: getFontFamily("regular", "Barlow"),
    },
    inputIOS: {
      fontFamily: getFontFamily("regular", "Barlow"),
    },
  },

  dark: {
    inputAndroid: {
      fontFamily: getFontFamily("regular", "Barlow"),
    },
    inputIOS: {
      fontFamily: getFontFamily("regular", "Barlow"),
    },
  },

  unicorn: {
    inputAndroid: {
      fontFamily: getFontFamily("regular", "Pangram"),
    },
    inputIOS: {
      fontFamily: getFontFamily("regular", "Pangram"),
    },
  },
};

const SimpleSelectStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default SimpleSelectStyle;
