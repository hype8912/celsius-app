import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: { marginBottom: 10 },
  statusText: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: widthPercentageToDP("7%"),
    height: widthPercentageToDP("7%"),
    borderRadius: widthPercentageToDP("7%") / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const InfoSectionStyle = () => getThemedStyle(base, themed);

export default InfoSectionStyle;
