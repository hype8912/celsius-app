// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    twoFactor: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: heightPercentageToDP(10)
    },
    twoFactorImage: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        position: "absolute",
        bottom: -heightPercentageToDP("6%"),
        left: -widthPercentageToDP("5%")
    },
    twoFactorText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignContent: 'right',
        alignItems: 'flex-end',
    },
    email: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: heightPercentageToDP(10)
    },
    emailImage: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        position: "absolute",
        bottom: -heightPercentageToDP("6%"),
        left: -widthPercentageToDP("5%")
    },
    emailText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    userActionsLogWrapper: {
        marginTop: 10,
    },
    userActionsLog: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'flex-start',
    },
    accountActionsLogWrapper: {
        marginTop: 5,
        alignItems: 'center',
    },
    accountActionsLog: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    accountActionsLog1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        // alignSelf: 'center',

    },
    accountActionsLog2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    accountActionsLog3: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    renderDeviceWrapper: {
        marginTop: 10,
    },
    renderDevice: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'center',
        alignSelf: 'center',

    },
    renderDeviceModel: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',

    },
    renderDeviceCity: {
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'flex-end'
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

const SecurityOverviewStyle = () => getThemedStyle(base, themed);

export default SecurityOverviewStyle
