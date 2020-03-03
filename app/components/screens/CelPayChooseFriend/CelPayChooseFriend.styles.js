// import STYLES from '../../../constants/STYLES';
// import { Dimensions } from "react-native";
import { getThemedStyle } from '../../../utils/styles-util';

// const SCREEN_HEIGHT = Dimensions.get("window").height;

// const titleSize = SCREEN_HEIGHT

const base = {
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },
    wrapper: {
       
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

const CelPayChooseFriendStyle = () => getThemedStyle(base, themed);

export default CelPayChooseFriendStyle
