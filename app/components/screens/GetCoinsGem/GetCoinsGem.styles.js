import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
    backgroundColor: COLOR_KEYS.CARDS,
    paddingTop: 60,
  },
  wrapper: {
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 8,
    width: widthPercentageToDP("90%"),
    marginBottom: heightPercentageToDP("4%"),
    maxHeight: heightPercentageToDP("90%"),
    overflow: "hidden",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const GetCoinsGemStyle = () => getThemedStyle(base, themed);

export default GetCoinsGemStyle;
