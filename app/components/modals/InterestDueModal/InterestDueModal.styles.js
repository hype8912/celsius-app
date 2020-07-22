import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  installmentsWrapper: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const InterestDueModalStyle = () => getThemedStyle(base, themed);

export default InterestDueModalStyle;
