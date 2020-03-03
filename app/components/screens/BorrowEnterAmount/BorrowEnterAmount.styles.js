// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  amountsWrapper: {
    marginTop: 20,
    backgroundColor: "white",
    flexDirection: "row",
    height: heightPercentageToDP("12%"),
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8
  },
  value: {
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("10%"),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  slider: { marginTop: 30, marginBottom: 30 },
  image: { width: 140, height: 140, resizeMode: "contain" },
  imageWrapper: { alignItems: "center", justifyContent: "center" }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const BorrowEnterAmountStyle = () => getThemedStyle(base, themed);

export default BorrowEnterAmountStyle;
