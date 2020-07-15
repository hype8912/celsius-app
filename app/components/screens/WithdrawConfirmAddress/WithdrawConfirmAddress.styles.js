import { Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  coinAmountContainer: {
    marginTop: heightPercentageToDP("5.56%"),
    marginBottom: heightPercentageToDP("5.56%"),
    alignItems: "center",
  },
  containerWithMargin: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  button: {
    marginTop: heightPercentageToDP("3.26%"),
  },
  tagText: {
    color: COLOR_KEYS.LINK,
    textAlign: "left",
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const WithdrawalAddressStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressStyle;
