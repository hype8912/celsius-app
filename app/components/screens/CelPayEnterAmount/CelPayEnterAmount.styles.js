// import STYLES from '../../../constants/STYLES';
import { Dimensions, Platform } from 'react-native'
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const { width } = Dimensions.get('window')

const base = {
  container: {
    flex: 1,
    width
  },
  wrapper: {
    paddingHorizontal: 20
  },
  selectWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center',
    borderRadius: 8,
    ...Platform.select({
      android: {
        borderColor: '#E9E9E9',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2
      },
      ios: {
        ...STYLES.SHADOW_STYLES
      }
    }),
    paddingHorizontal: 10,
    marginBottom: 5
  },
  amounts: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
}

const themed = {
  light: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  },

  dark: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      ...Platform.select({
        android: {
          borderColor: 'transparent',
        },
      })
    }
  },

  celsius: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  }
}

const CelPayEnterAmountStyle = () => getThemedStyle(base, themed)

export default CelPayEnterAmountStyle
