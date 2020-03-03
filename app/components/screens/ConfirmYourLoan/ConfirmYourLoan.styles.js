// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
  interestContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  interest: { maxWidth: '45%', paddingHorizontal: 10 },
  monthly: { width: '45%', paddingHorizontal: 5 }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const ConfirmYourLoanStyle = () => getThemedStyle(base, themed);

export default ConfirmYourLoanStyle
