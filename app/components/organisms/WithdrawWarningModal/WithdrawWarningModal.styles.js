import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        flex: 1
    },
    title: {

    },
    text: {
        paddingBottom: 30,
        paddingTop: 20,
    },
    checkbox: {
        flexDirection: 'row',
    },
    box: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: STYLES.COLORS.GRAY,
        width: 25,
        height: 25,
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

const WithdrawWarningModalStyle = () => getThemedStyle(base, themed);

export default WithdrawWarningModalStyle