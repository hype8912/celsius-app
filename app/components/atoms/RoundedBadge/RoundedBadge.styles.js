import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    borderWidth: 0.5,
    backgroundColor: COLOR_KEYS.BACKGROUND,
    borderColor: COLOR_KEYS.BACKGROUND,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const RoundedBadgeStyle = () => getThemedStyle(base, themed);

export default RoundedBadgeStyle;
