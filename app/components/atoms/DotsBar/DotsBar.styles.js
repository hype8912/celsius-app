import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    basicCircle: {
        width: 12,
        height: 12,
        backgroundColor: STYLES.COLORS.GRAY,
        borderRadius: 10,
        marginHorizontal: 10
    },
    activeCircle: {
        backgroundColor: STYLES.COLORS.MEDIUM_GRAY,
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

const DotsBarStyle = () => getThemedStyle(base, themed);

export default DotsBarStyle