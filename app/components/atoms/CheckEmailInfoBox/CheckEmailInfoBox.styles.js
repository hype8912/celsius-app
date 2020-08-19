import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  circle: {
    width: widthPercentageToDP("8%"),
    height: widthPercentageToDP("8%"),
    borderRadius: widthPercentageToDP("8%") / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  direction: { flexDirection: "row" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CheckEmailInfoBoxStyle = () => getThemedStyle(base, themed);

export default CheckEmailInfoBoxStyle;
