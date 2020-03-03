import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    }
}

const themed = {
    dark: {
        container: {
            backgroundColor: STYLES.COLORS.DARK_BACKGROUND
        },
        headerTitle: {
            color: STYLES.COLORS.WHITE_OPACITY5
        }
    },

    light: {
        container: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        },
        headerTitle: {
            color: STYLES.COLORS.DARK_GRAY
        }
    },

    celsius: {
        container: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        },
        headerTitle: {
            color: STYLES.COLORS.WHITE_OPACITY5
        }
    },
}

const RegularLayoutStyle = (theme) => (theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed));

export default RegularLayoutStyle