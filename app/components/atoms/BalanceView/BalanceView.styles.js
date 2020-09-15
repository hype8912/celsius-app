import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: COLOR_KEYS.CARDS,
  },
  text: { color: COLOR_KEYS.HEADLINE },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const BalanceViewStyle = () => getThemedStyle(base, themed);

export default BalanceViewStyle;
