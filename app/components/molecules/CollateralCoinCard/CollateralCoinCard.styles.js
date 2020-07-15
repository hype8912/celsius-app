import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginVertical: 5,
    flex: 0.8,
  },
  marginRequired: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: COLOR_KEYS.CARDS,
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
