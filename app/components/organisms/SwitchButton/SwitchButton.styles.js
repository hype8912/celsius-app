import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 18,
    borderRadius: 8,
    height: 50,
    backgroundColor: COLOR_KEYS.CARDS,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const SwitchButtonStyle = () => getThemedStyle(base, themed);

export default SwitchButtonStyle;
