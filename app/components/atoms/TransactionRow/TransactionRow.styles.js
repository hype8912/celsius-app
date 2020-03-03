// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  rightSide: {
    alignItems: 'flex-end'
  },
  amounts: {
    marginLeft: 10
  },
  statusText: {
    marginBottom: 5
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

const TransactionRowStyle = () => getThemedStyle(base, themed);

export default TransactionRowStyle
