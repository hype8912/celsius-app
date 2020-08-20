// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  // heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    width: "100%",
    backgroundColor: COLOR_KEYS.TOOLTIP,
    borderRadius: 8,
    alignSelf: "center",
    padding: 10,
  },
  securityStrengthItem: {
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PinTooltipStyle = () => getThemedStyle(base, themed);

export default PinTooltipStyle;
