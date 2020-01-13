import { Dimensions } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
};

const themed = {
  light: {
    tagText: {
      color: STYLES.COLORS.DARK_GRAY,
      textAlign: "left",
    },
  },
  dark: {
    tagText: {
      color: STYLES.COLORS.WHITE_OPACITY5,
      textAlign: "left",
    },
  },

  celsius: {},
};

const WithdrawalAddressStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressStyle;
