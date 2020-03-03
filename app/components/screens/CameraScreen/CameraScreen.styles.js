import { StyleSheet, Dimensions, Platform } from 'react-native'
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const { height, width } = Dimensions.get('window')
const newWidth = height * (3 / 4)
const widthOffset = -((newWidth - width) / 2)

const base = {
  container: {
    flex: 1
  },
  camera: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    ...Platform.select({
      android: {
        left: widthOffset,
        right: widthOffset
      }
    })
  },
  mask: { flex: 1 },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: STYLES.COLORS.WHITE,
    ...Platform.select({
      ios:{
        width: '100%'
      },
      android: {
        
    left: -widthOffset,
    right: -widthOffset
      }
    })
  },
  actionBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  }
}

const themed = {
  light: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    actionBar: {
      backgroundColor: "white"
    },
  },

  dark: {
    maskOverlayColor: {
      backgroundColor: STYLES.COLORS.DARK_OVERLAY,
    },
    actionBar: {
      backgroundColor: STYLES.COLORS.DARK_HEADER
    },
  },

  celsius: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    actionBar: {
      backgroundColor: "white"
    },
  }
}

const CameraScreenStyle = () => getThemedStyle(base, themed)

export default CameraScreenStyle
