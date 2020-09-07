import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  amounts: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CelPayEnterAmountStyle = () => getThemedStyle(base, themed);

export default CelPayEnterAmountStyle;
