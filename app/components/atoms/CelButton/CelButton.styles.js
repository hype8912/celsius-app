// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, getScaledFont } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 1,
    },
    mediumContainer: {
        borderRadius: 60,
        paddingLeft: 35,
        paddingRight: 35,
        height: 50
    },
    smallContainer: {
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        height: 35
    },
    loader: {
        width: 30,
        height: 30
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: 'transparent',
        borderWidth: 2
    },
    basicButton: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        height: 'auto',
        paddingLeft: 0,
        paddingRight: 0
    },
    baseTitle: {
        textAlign: 'center',
        color: 'white',
        // margin: 'auto',
    },
    mediumTitle: {
        fontSize: getScaledFont(18)
    },
    smallTitle: {
        fontSize: getScaledFont(14)
    },
    ghostButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: STYLES.COLORS.CELSIUS_BLUE
    },
    ghostTitle: {
        color: STYLES.COLORS.CELSIUS_BLUE
    }
}

const themed = {
    light: {
        container: {
            backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
            borderColor: STYLES.COLORS.CELSIUS_BLUE
        },
        basicTitle: {
            color: STYLES.COLORS.CELSIUS_BLUE
        },
        disabledTitleColor: {
            color: STYLES.COLORS.CELSIUS_BLUE
        }
    },

    dark: {
        container: {
            backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
            borderColor: STYLES.COLORS.CELSIUS_BLUE
        },
        basicTitle: {
            color: STYLES.COLORS.CELSIUS_BLUE
        },
        disabledTitleColor: {
            color: STYLES.COLORS.CELSIUS_BLUE
        }
    },

    celsius: {
        container: {
            backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
            borderColor: STYLES.COLORS.CELSIUS_BLUE
        },
        basicTitle: {
            color: STYLES.COLORS.WHITE
        },
        disabledTitleColor: {
            color: STYLES.COLORS.CELSIUS_BLUE
        }
    }
}

const CelButtonStyle = () => getThemedStyle(base, themed);

export default CelButtonStyle
