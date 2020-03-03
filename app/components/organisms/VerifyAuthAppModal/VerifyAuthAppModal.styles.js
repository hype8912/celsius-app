// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'

const base = {
  container: {
    flex: 1
  },
  buttonBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const VerifyAuthAppModalStyle = () => getThemedStyle(base, themed)

export default VerifyAuthAppModalStyle
