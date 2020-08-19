// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  // heightPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    width: "100%",
    backgroundColor: STYLES.COLORS.DARK_GRAY, // TODO: missing COLOR_KEY
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
