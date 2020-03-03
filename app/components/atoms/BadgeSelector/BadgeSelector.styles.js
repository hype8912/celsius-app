import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
};

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
};

const BadgeSelectorStyle = () => getThemedStyle(base, themed);

export default BadgeSelectorStyle
