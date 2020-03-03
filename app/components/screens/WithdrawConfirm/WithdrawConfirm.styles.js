// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'

const base = {
  container: {
    flex: 1
  },
  address: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 15
  },
  amountWrapper: {
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  lineHeight: {
    lineHeight: 23
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const WithdrawConfirmStyle = () => getThemedStyle(base, themed)

export default WithdrawConfirmStyle
