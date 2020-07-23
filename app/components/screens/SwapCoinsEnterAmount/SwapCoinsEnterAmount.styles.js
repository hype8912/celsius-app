import { Dimensions } from "react-native";
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
  },
  fiatSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  cryptoSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  fiatWrapper: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  amounts: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    width: width - widthPercentageToDP("10%"),
    marginHorizontal: 20,
  },
  text: {
    color: COLOR_KEYS.HEADLINE,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const SwapoinsEnterAmountStyle = () => getThemedStyle(base, themed);

export default SwapoinsEnterAmountStyle;
