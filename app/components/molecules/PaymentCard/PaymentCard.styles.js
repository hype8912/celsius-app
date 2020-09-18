import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  coinInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginTop: 5,
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marginRequired: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
  },
  buttonsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  cardStyle: {
    color: COLOR_KEYS.CARDS,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CoinCardStyle = () => getThemedStyle(base, themed);

export default CoinCardStyle;
