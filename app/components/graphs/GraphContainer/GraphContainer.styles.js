// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  xTick: { height: heightPercentageToDP("5%") },
  spinner: {
    height: heightPercentageToDP("20.21%"),
    justifyContent: "center",
    alignItems: "center"
  },
  period: {
    marginBottom: heightPercentageToDP("5%"),
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const GraphContainerStyle = () => getThemedStyle(base, themed);

export default GraphContainerStyle;
