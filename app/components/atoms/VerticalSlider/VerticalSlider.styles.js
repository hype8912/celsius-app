// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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

const VerticalSliderStyle = () => getThemedStyle(base, themed);

export default VerticalSliderStyle