import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  enterAmount: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchButton: {
    zIndex: 1,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 28,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLOR_KEYS.CARDS,
  },
  inputField: {
    flex: 1,
    fontWeight: "600",
    paddingVertical: 0,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CoinSwitchStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CoinSwitchStyle;
