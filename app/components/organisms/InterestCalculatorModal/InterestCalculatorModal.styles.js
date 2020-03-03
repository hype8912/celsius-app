// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const base = {
  container: {
    flex: 1
  },
  earningCard: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: STYLES.COLORS.WHITE,
    borderColor: STYLES.COLORS.DARK_GRAY3
  },
  selectedCard: {
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    borderColor: STYLES.COLORS.CELSIUS_BLUE
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const InterestCalculatorModalStyle = () => getThemedStyle(base, themed)

export default InterestCalculatorModalStyle
