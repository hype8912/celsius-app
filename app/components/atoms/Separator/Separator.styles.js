// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    content: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        // height: 60,
    },
    separator: {
        width: '100%'
    },
    separatorVertical: {
        height: '100%'
    },
    center: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    left: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'flex-end'

    }
}

const themed = {
    light: {
      separatorColor: {
        color: STYLES.COLORS.MEDIUM_GRAY
      }
    },

    dark: {
        separatorColor: {
          color: STYLES.COLORS.WHITE_OPACITY7
        }
    },

    celsius: {
        separatorColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        },
    }
}

const SeparatorStyle = () => getThemedStyle(base, themed);

export default SeparatorStyle
