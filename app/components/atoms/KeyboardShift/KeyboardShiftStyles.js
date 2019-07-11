// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    width: '100%'
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

const KeyboardShiftStyle = () => getThemedStyle(base, themed);

export default KeyboardShiftStyle