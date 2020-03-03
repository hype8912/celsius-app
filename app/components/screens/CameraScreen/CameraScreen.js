import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Camera, Permissions, ImageManipulator, ImagePicker } from 'expo'


import * as appActions from '../../../redux/actions'
import CameraScreenStyle from './CameraScreen.styles'
import Icon from '../../atoms/Icon/Icon'
import STYLES from '../../../constants/STYLES'
import API from '../../../constants/API'
import CelText from '../../atoms/CelText/CelText'
import loggerUtil from '../../../utils/logger-util'
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

const { height, width } = Dimensions.get('window')

@connect(
  state => ({
    cameraType: state.camera.cameraType,
    cameraRollLastPhoto: state.camera.cameraRollPhotos[0],
    photo: state.camera.photo,
    cameraField: state.camera.cameraField,
    cameraHeading: state.camera.cameraHeading,
    cameraCopy: state.camera.cameraCopy,
    mask: state.camera.mask
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CameraScreen extends Component {
  static propTypes = {
    cameraField: PropTypes.string,
    cameraHeading: PropTypes.string,
    cameraCopy: PropTypes.string,
    cameraType: PropTypes.oneOf(['front', 'back']),
    photo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Object)
    ]),
    mask: PropTypes.oneOf(['circle', 'document']),
    onSave: PropTypes.func
  }

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo',
    mask: 'circle'
  }

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true
  })

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo'
  }

  constructor (props) {
    super(props)

    this.state = {
      hasCameraPermission: false,
      hasCameraRollPermission: false,
      hasInitialPhoto: !!props.photo,
      size: {
        width,
        height
      }
    }
  }

  async componentWillMount () {
    const { actions } = this.props
    actions.setFabType('hide')
    await this.getCameraPermissions()
    await this.getCameraRollPermissions()
  }

  getCameraPermissions = async () => {
    const { actions } = this.props
    let perm = await Permissions.getAsync(Permissions.CAMERA)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA)
    }

    if (perm.status === 'granted') {
      this.setState({ hasCameraPermission: perm.status === 'granted' })
    } else {
      actions.showMessage(
        'warning',
        'It looks like you denied Celsius app access to your camera. Please enable it in your phone settings.'
      )
      actions.navigateBack()
    }
  }

  getCameraRollPermissions = async () => {
    const { actions, cameraRollLastPhoto } = this.props
    let perm = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }

    if (perm.status === 'granted') {
      if (!cameraRollLastPhoto) actions.getCameraRollPhotos()
      this.setState({ hasCameraPermission: perm.status === 'granted' })
    } else {
      actions.showMessage(
        'warning',
        'It looks like you denied Celsius app access to your camera roll. Please enable it in your phone settings.'
      )
    }
  }

  getMaskImage = mask => {
    switch (mask) {
      case 'document':
        return {
          lightSource: require('../../../../assets/images/mask/card-mask-transparent.png'),
          darkSource: require('../../../../assets/images/mask/dark-card-mask-transparent.png'),
        }
      case 'circle':
      default:
        return {
          lightSource: require('../../../../assets/images/mask/circle-mask.png'),
          darkSource: require('../../../../assets/images/mask/dark-circle-mask.png'),
        }
    }
  }

  pickImage = async () => {
    const { actions, mask, navigation } = this.props
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [STYLES.imageSizes[mask].width, STYLES.imageSizes[mask].height]
    })
    if (result.cancelled) {
      return
    }
    actions.navigateTo('ConfirmCamera', {
      onSave: navigation.getParam('onSave')
    })
    actions.takeCameraPhoto(result)
  }

  takePhoto = async () => {
    if (!this.camera) return

    const { actions, mask, navigation, cameraType } = this.props
    try {
      if (!this.state.hasCameraPermission) {
        return await this.getCameraPermissions()
      }

      actions.startApiCall(API.TAKE_CAMERA_PHOTO)
      await actions.navigateTo('ConfirmCamera', {
        onSave: navigation.getParam('onSave')
      })
      const photo = await this.camera.takePictureAsync()
      const { size } = this.state
      let cropWidth

      if (photo.width / photo.height > size.width / size.height) {
        const coef = photo.width * (size.height / photo.height)
        const overScan = ((coef - size.width) * 0.5) / coef
        cropWidth = photo.width - 2 * size.width * overScan
        cropWidth = (cropWidth * STYLES.imageSizes[mask].width) / size.width
      } else {
        cropWidth = (STYLES.imageSizes[mask].width / size.width) * photo.width
      }

      const cropHeight =
        (cropWidth / STYLES.imageSizes[mask].width) *
        STYLES.imageSizes[mask].height

      const imageManipulations = [
        {
          resize: { ...photo }
        },
        {
          crop: {
            originX: (photo.width - cropWidth) / 2,
            originY: (photo.height - cropHeight) / 2,
            width: cropWidth,
            height: cropHeight
          }
        }
      ]

      if (cameraType === 'front') {
        imageManipulations.push({
          flip: { horizontal: cameraType === 'front' }
        })
      }

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        imageManipulations,
        { compress: 0.95, format: 'jpg' }
      )

      actions.takeCameraPhoto(resizedPhoto)
    } catch (err) {
      loggerUtil.err(err)
    }
  }

  renderMask = () => {
    const { mask, cameraHeading } = this.props
    const imageSource = this.getMaskImage(mask)
    const style = CameraScreenStyle()
    return (
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <View style={[style.mask, style.maskOverlayColor]}>
          <SafeAreaView
            style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}
          >
            <CelText
              weight='700'
              type='H1'
              align='center'
              style={{ alignSelf: 'flex-end', flex: 1 }}
            >
              {cameraHeading}
            </CelText>
          </SafeAreaView>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[style.mask, style.maskOverlayColor]} />
          <ThemedImage
            { ...imageSource }
            style={{
              width: STYLES.imageSizes[mask].width,
              height: STYLES.imageSizes[mask].height,
              alignSelf: 'center'
            }}
          />
          <View style={[style.mask, style.maskOverlayColor]}/>
        </View>
        <View style={[style.mask, style.maskOverlayColor]}>
          <View
            style={{
              width: STYLES.imageSizes[mask].width,
              alignSelf: 'center',
              marginTop: 20
            }}
          />
        </View>
      </View>
    )
  }

  render () {
    const { cameraType, actions, cameraRollLastPhoto } = this.props
    const style = CameraScreenStyle()
    const Mask = this.renderMask

    return (
      <Camera
        ref={ref => {
          this.camera = ref
        }}
        onLayout={event => {
          this.setState({ size: event.nativeEvent.layout })
        }}
        style={style.camera}
        type={Camera.Constants.Type[cameraType]}
      >
        <Mask />
        <SafeAreaView style={style.bottomView}>
          <View
            style={style.actionBar}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={this.pickImage}>
              {cameraRollLastPhoto && (
                <Image
                  source={{ uri: cameraRollLastPhoto.node.image.uri }}
                  resizeMode='cover'
                  style={{ width: 50, height: 50 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.takePhoto}
            >
              <Icon
                name='Shutter'
                fill={STYLES.COLORS.CELSIUS_BLUE}
                width='60'
                height='60'
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ ratio: '4:3' }, actions.flipCamera)
              }}
            >
              <Icon
                style={{ alignSelf: 'flex-end' }}
                name='Swap'
                width='35'
                fill={'#3D4853'}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera>
    )
  }
}

export default CameraScreen
