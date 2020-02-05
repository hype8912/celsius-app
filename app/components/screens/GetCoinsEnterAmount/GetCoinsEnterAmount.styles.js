import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1
  },
  fiatSection: {
    alignItems: "center",
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
  },
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const GetCoinsEnterAmountStyle = () => getThemedStyle(base, themed);

export default GetCoinsEnterAmountStyle
