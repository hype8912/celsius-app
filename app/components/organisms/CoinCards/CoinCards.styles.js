// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  addMoreCoinsGrid: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: widthPercentageToDP("50%") - 28, // same width as Card.styles.js style half
    minHeight: 130,
    borderColor: "gray",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addMoreCoinsList: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: "100%",
    height: 80,
    borderColor: "gray",
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  coinCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CoinsCardStyle = () => getThemedStyle(base, themed);

export default CoinsCardStyle;
