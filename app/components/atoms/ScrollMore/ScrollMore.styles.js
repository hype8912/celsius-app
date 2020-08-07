import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  caretWrapper: {
    alignItems: "center",
    height: 30,
    position: "absolute",
    width: "100%",
  },
  gradientColor: {
    color: COLOR_KEYS.CARDS,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const ScrollMoreStyle = () => getThemedStyle(base, themed);

export default ScrollMoreStyle;
