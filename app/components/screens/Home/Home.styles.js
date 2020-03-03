// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
    }
}

const themed = {
    dark: {
    },

    light: {
    },

    celsius: {
    },
}

const HomeStyle = () => getThemedStyle(base, themed);

export default HomeStyle
