import { Dimensions } from "react-native";
import STYLES from '../../../constants/STYLES';
import { getThemedStyle, widthPercentageToDP } from '../../../utils/styles-util';

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
  },
  fiatSection: {
    alignItems: "center",
    paddingVertical: 10
  },
  cryptoSection: {
    alignItems: "center",
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    paddingVertical: 10
  },
  fiatWrapper: {
    backgroundColor: STYLES.COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  amounts: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    width: width - widthPercentageToDP("10%"),
    marginHorizontal: 20
  },
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const GetCoinsEnterAmountStyle = () => getThemedStyle(base, themed);

export default GetCoinsEnterAmountStyle
