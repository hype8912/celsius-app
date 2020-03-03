// import STYLES from '../../../constants/STYLES';
import { StyleSheet } from 'react-native'
import { getThemedStyle, getPadding } from '../../../utils/styles-util'
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
  },
  amounts: {
    ...StyleSheet.flatten(getPadding('20 20 20 20'))
  }
}

const themed = {
  light: {
    amounts: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY
    }
  },

  dark: {
    amounts: {
      backgroundColor: STYLES.COLORS.DARK_BACKGROUND
    },
    calculatorInfo: {
      color: STYLES.COLORS.DARK_GRAY
    }
  },

  celsius: {
    amounts: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY
    }
  }
}

const InterestCalculatorModalStyle = (theme) => (theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed))

export default InterestCalculatorModalStyle
