import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    item: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 12,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderRadius: 8
    },
    activeItem: {
        backgroundColor: STYLES.COLORS.WHITE
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        width: 35,
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    flagImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: STYLES.COLORS.WHITE
    }
}

const themed = {
    light: {
        activeItem: {
            backgroundColor: STYLES.COLORS.WHITE
        }
    },

    dark: {
        activeItem: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        }
    },

    celsius: {
        activeItem: {
            backgroundColor: STYLES.COLORS.WHITE
        }
    }
}

const SelectCountryStyles = () => getThemedStyle(base, themed);

export default SelectCountryStyles