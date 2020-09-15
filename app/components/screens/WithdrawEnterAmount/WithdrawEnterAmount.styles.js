import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    height: "100%",
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    marginBottom: 80,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WithdrawEnterAmountStyle = () => getThemedStyle(base, themed);

export default WithdrawEnterAmountStyle;
