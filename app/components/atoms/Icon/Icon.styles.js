// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    fillColor: {}
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const IconStyle = () => getThemedStyle(base, themed);

export default IconStyle