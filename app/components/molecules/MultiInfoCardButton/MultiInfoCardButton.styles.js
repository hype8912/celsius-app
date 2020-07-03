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
    marginBottom: heightPercentageToDP("0.08%"),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const MultiInfoCardStyle = () => getThemedStyle(base, themed);

export default MultiInfoCardStyle;
