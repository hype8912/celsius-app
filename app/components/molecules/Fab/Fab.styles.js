import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  fabButtonStyle: {
    width: 60,
    height: 60,
    backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON),
    borderRadius: 60,
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const FabStyle = () => getThemedStyle(base, themed);

export default FabStyle;
