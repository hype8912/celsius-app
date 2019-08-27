import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    borderWidth: 1,
    height: 2,
    marginTop: 10,
    marginRight: 5
  },
  leftSegment: {
    alignItems: 'flex-start',
    borderColor: 'blue',
    borderWidth: 1,
    height: 2,
    marginTop: 10,
    width: 21
  },
  right: {
    flex: 1,
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: 1,
    height: 2,
    marginTop: 10,
    marginLeft: 5
  },
  centralText: {
    maxWidth: '70%',
    alignContent: 'center'
  },
}

const themed = {
    light: {
      leftSegment: {
        borderColor: STYLES.COLORS.GRAY
      },
      left: {
        borderColor: STYLES.COLORS.GRAY,
      },
      right: {
        borderColor: STYLES.COLORS.GRAY,
      },
      centralText: {
        color: STYLES.COLORS.MEDIUM_GRAY
      }
    },

    dark: {
      leftSegment: {
        borderColor: STYLES.COLORS.WHITE_OPACITY5
      },
      left: {
        borderColor: STYLES.COLORS.WHITE_OPACITY5,
      },
      right: {
        borderColor: STYLES.COLORS.WHITE_OPACITY5,
      },

    },

    celsius: {
    }
}

const ExpandableItemStyle = () => getThemedStyle(base, themed);

export default ExpandableItemStyle