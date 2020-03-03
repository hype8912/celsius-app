import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        
    },
    fabButtonStyle: {
        width: 60,
        height: 60,
        backgroundColor: STYLES.COLORS.CELSIUS,
        borderRadius: 60,
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center'
    },
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const FabStyle = () => getThemedStyle(base, themed);

export default FabStyle