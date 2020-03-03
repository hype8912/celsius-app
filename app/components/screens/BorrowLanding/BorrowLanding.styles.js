// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1
  },

  iconWrapper: {
    borderRadius: 40,
    height: 40,
    width: 40,
    marginRight: 10,
    justifyContent: 'center'
  },

  info: {
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
}

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const BorrowLandingStyle = () => getThemedStyle(base, themed);

export default BorrowLandingStyle
