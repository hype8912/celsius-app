// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    ssnInput: {
        flex: 1,
        flexDirection: 'row',
        // flexGrow: 1,
        // width: 'auto',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 20,
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

const KYCTaxpayerStyle = () => getThemedStyle(base, themed);

export default KYCTaxpayerStyle