// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    width: heightPercentageToDP("18%"),
    height: heightPercentageToDP("18%"),
    borderRadius: heightPercentageToDP("9%"),
    justifyContent: "center",
    alignItems: "stretch",
    left: -25,
    bottom: -25,
  },
  card: {
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 2,
  },
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignContent: 'right',
    alignItems: "flex-end",
    margin: 12,
  },

  infoSubtitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ToggleInfoCardStyle = () => getThemedStyle(base, themed);

export default ToggleInfoCardStyle;
