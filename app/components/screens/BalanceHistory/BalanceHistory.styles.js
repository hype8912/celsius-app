// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        paddingHorizontal: 20,
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

const BalanceHistoryStyle = () => getThemedStyle(base, themed);

export default BalanceHistoryStyle
