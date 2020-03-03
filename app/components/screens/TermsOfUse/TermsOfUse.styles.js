// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    wrapper: {
        // alignItems: 'center',
        // alignContent: 'center',
    },
    heading: {
        marginLeft: '7%',
        paddingBottom: 20,
        paddingTop: 20,

    },
    text: {
        marginLeft: '7%',
        marginRight: '7%',
        // marginBottom: 100,
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

const TermsOfUseStyle = () => getThemedStyle(base, themed);

export default TermsOfUseStyle