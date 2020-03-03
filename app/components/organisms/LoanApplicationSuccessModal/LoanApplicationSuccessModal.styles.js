// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 20
      },
      description: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
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

const LoanApplicationSuccessModalStyle = () => getThemedStyle(base, themed);

export default LoanApplicationSuccessModalStyle