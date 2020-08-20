import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
    marginBottom: heightPercentageToDP("1.56%"),
  },
  primary: {
    marginTop: heightPercentageToDP("1.25%"),
  },
  explanation: {
    marginTop: heightPercentageToDP("0.5%"),
  },
  active: {
    marginTop: 5,
    width: widthPercentageToDP("3.5%"),
    borderTopColor: COLOR_KEYS.LINK,
    borderTopWidth: 1,
  },
  buttonWrapper: { flex: 1, flexDirection: "row" },
  button: { flex: 1 },
  innerStyle: { alignItems: "center" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CommunityDashboardStyle = () => getThemedStyle(base, themed);

export default CommunityDashboardStyle;
