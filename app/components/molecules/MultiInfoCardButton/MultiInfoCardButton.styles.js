import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  cardWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25,
  },
  image: {
    width: heightPercentageToDP("6%"),
    height: heightPercentageToDP("6%"),
    resizeMode: "contain",
  },
  titleWrapper: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    height: heightPercentageToDP("3.5%"),
  },
  explanationWrapper: {
    flex: 0.75,
    flexWrap: "nowrap",
  },
  active: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  chevronStyle: {
    marginLeft: 8,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const MultiInfoCardStyle = () => getThemedStyle(base, themed);

export default MultiInfoCardStyle;
