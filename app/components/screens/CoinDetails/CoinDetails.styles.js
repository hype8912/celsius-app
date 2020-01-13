// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttons: {
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  coinAmountWrapper: {
    justifyContent: "space-between",
  },
  amountFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  separator: {
    right: 0,
    position: "absolute",
  },
  interestCardWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: widthPercentageToDP("3%"),
    paddingHorizontal: widthPercentageToDP("3%"),
  },
  interestWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  interestRateWrapper: {
    justifyContent: "flex-start",
    alignContent: "flex-end",
    paddingTop: 12,
  },
  buttonItself: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonIcon: {
    opacity: 0.5,
  },
  graphContainer: { justifyContent: "center", alignItems: "center" },
  priceIndicator: { paddingHorizontal: 20 },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CoinDetailsStyle = () => getThemedStyle(base, themed);

export default CoinDetailsStyle;
