import { getThemedStyle, heightPercentageToDP } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    coinAmountContainer: {
        marginTop: heightPercentageToDP("5.56%"),
        marginBottom: heightPercentageToDP("5.56%"),
        alignItems: "center"
    },
    containerWithMargin: {
        alignSelf: "flex-start",
        marginBottom: 10
    },
    tagText: {
        color: STYLES.COLORS.CELSIUS_BLUE,
        textAlign: "left"
    },
    button: {
        marginBottom: heightPercentageToDP("7%"),
        marginTop: heightPercentageToDP("3.26%")
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

const WithdrawalAddressConfirmationStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressConfirmationStyle
