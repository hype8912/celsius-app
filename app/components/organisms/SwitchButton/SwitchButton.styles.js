import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 18,
        borderRadius: 8,
        height: 50,
        backgroundColor: STYLES.COLORS.WHITE
    }
}

const themed = {
    light: {
      container: {
          backgroundColor: STYLES.COLORS.WHITE
      }
    },

    dark: {
      container: {
        backgroundColor: STYLES.COLORS.DARK_HEADER
    }
    },

    celsius: {
    }
}

const SwitchButtonStyle = () => getThemedStyle(base, themed);

export default SwitchButtonStyle
