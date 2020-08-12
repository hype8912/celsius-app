import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  view: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: STYLES.COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  text: {
    marginTop: 10,
    color: COLOR_KEYS.PARAGRAPH,
  },
  viewmenu: { backgroundColor: COLOR_KEYS.PRIMARY_BUTTON },
  textmenu: { color: COLOR_KEYS.PARAGRAPH },
  viewcoin: { backgroundColor: COLOR_KEYS.CARDS },
  textcoin: { color: COLOR_KEYS.HEADLINE },
  fillColor: { color: COLOR_KEYS.HEADLINE },
  iconColor: { color: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CircleButtonStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CircleButtonStyle;
