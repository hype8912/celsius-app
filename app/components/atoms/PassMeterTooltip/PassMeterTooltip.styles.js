import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    width: "100%",
    backgroundColor: getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE),
    borderRadius: 8,
    alignSelf: "center",
    padding: 10,
  },
  securityStrengthItem: {
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const PassMeterTooltipStyle = () => getThemedStyle(base, themed);

export default PassMeterTooltipStyle;
