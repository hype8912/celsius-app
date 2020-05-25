// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  bodyWrapper: {
    height: heightPercentageToDP(70),
  },
  buttonWrapper: {
    height: heightPercentageToDP(15),
    justifyContent: "center",
    alignItems: "center",
  },
  infoBoxWrapper: {
    flexDirection: "row",
  },
  infoBoxIconWrapper: {
    flex: 0.15,
    paddingRight: 5,
  },
  infoBoxTextWrapper: {
    flex: 0.85,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SecurityFixNowStyle = () => getThemedStyle(base, themed);

export default SecurityFixNowStyle;
