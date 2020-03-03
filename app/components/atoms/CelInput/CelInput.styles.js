import { Platform, StyleSheet } from 'react-native';
import { getPadding, getThemedStyle, getScaledFont } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const fontSize = getScaledFont(STYLES.FONTSIZE.H4);
const base = {
    container: {
        borderRadius: 8
    },
    fullScreen: {
        width: '100%',
        // borderWidth: 20
    },
    trans: {
        backgroundColor: 'transparent'
    },
    inputWrapper: {
        ...StyleSheet.flatten(getPadding("12 16 15 16")),
        height: 50,
        borderRadius: 8,
        // borderWidth: 20,
        backgroundColor: STYLES.COLORS.WHITE,
        ...Platform.select({
            android: {
                ...STYLES.ANDROID_BORDER_STYLES,
                borderColor: 'transparent',
            },
            ios: {
                ...STYLES.SHADOW_STYLES,
            }
        })

    },
    input: {
        height: 28,
        fontSize,
        fontFamily: 'barlow-light',
    },
    disabledInput: {
        opacity: 0.6
    },
    activeInput: {
        borderWidth: 1,
        borderColor: STYLES.COLORS.DARK_GRAY_OPACITY,
        shadowOpacity: 0
    },
    borderView: {
        // borderWidth: 1,
        borderColor: '#E9E9E9',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
    },
    rightText: {
      position: 'absolute',
      right: 10,
      top: 14,
      height: 23,
    }
}

const themed = {
    light: {
        inputWrapper: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        input: {
            color: STYLES.COLORS.DARK_GRAY
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    },

    dark: {
        inputWrapper: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        input: {
            color: STYLES.COLORS.WHITE
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.WHITE_OPACITY3
        }
    },

    celsius: {
        inputWrapper: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        input: {
            color: STYLES.COLORS.DARK_GRAY
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    }
}

const CelInputStyle = (theme) => (theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed));

export default CelInputStyle
