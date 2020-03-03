// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1,
        alignContent: 'center',

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: '20%'

    },
    title: {
        marginTop: 10,
        marginBottom: 10

    },
    subtitle: {
        marginRight: 25,
        marginLeft: 25,

    },
    button: {
        marginTop: 20,
        marginBottom: 20,

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

const WelcomeStyle = () => getThemedStyle(base, themed);

export default WelcomeStyle
