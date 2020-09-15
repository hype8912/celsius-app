import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  basicCircle: {
    width: 12,
    height: 12,
    backgroundColor: getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE),
    borderRadius: 10,
    marginHorizontal: 10,
  },
  activeCircle: {
    backgroundColor: getColor(COLOR_KEYS.DOT_INDICATOR_ACTIVE),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const DotsBarStyle = () => getThemedStyle(base, themed);

export default DotsBarStyle;
