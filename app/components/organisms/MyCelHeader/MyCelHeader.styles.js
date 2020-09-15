import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingHorizontal: 40,
  },
  arcChart: {
    marginHorizontal: widthPercentageToDP("8%"),
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sideContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  bottomContainer: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 5,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};
const MyCelHeaderStyle = () => getThemedStyle(base, themed);

export default MyCelHeaderStyle;
