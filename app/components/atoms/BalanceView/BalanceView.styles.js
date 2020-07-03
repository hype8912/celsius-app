import { Dimensions } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
  },
  view: {
    width,
    alignContent: "flex-start",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
};

const themed = {
  light: {
    view: { backgroundColor: getColor(COLOR_KEYS.HEADLINE, THEMES.LIGHT) },
    text: { color: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT) },
  },

  dark: {
    view: { backgroundColor: getColor(COLOR_KEYS.HEADLINE, THEMES.DARK) },
    text: { color: getColor(COLOR_KEYS.CARDS, THEMES.DARK) },
  },

  unicorn: {
    view: { backgroundColor: getColor(COLOR_KEYS.HEADLINE, THEMES.UNICORN) },
    text: { color: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN) },
  },
};

const BalanceViewStyle = () => getThemedStyle(base, themed);

export default BalanceViewStyle;
