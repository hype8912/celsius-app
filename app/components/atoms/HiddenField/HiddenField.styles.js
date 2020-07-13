import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  basicCircle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    margin: 10,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  activeCircle: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
  },
  lastCircle: {
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  errorCircle: {
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const HiddenPinStyle = () => getThemedStyle(base, themed);

export default HiddenPinStyle;
