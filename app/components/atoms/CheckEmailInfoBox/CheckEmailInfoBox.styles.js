import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  circle: {
    width: widthPercentageToDP("8%"),
    height: widthPercentageToDP("8%"),
    borderRadius: widthPercentageToDP("8%") / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
  },
  direction: { flexDirection: "row" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CheckEmailInfoBoxStyle = () => getThemedStyle(base, themed);

export default CheckEmailInfoBoxStyle;
