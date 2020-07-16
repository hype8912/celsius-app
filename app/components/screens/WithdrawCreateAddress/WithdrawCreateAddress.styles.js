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
    marginTop: heightPercentageToDP("4%"),
    marginBottom: heightPercentageToDP("5.56%"),
    alignItems: "center",
  },
  containerWithMargin: {
    marginBottom: 30,
  },
  tagText: {
    color: COLOR_KEYS.LINK,
    textAlign: "center",
  },
  button: {
    marginBottom: heightPercentageToDP("7%"),
    marginTop: heightPercentageToDP("3.26%"),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WithdrawalAddressConfirmationStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressConfirmationStyle;
