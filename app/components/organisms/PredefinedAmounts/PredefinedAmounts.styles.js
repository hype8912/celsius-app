import STYLES from '../../../constants/STYLES'
import { getThemedStyle } from '../../../utils/styles-util'

const base = {
  container: {
    flex: 1
  },
  selectedAmountText: {
    color: STYLES.COLORS.CELSIUS_BLUE,
    borderBottomWidth: 1,
    borderColor: STYLES.COLORS.CELSIUS_BLUE
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const PredefinedAmountsStyle = () => getThemedStyle(base, themed)

export default PredefinedAmountsStyle
