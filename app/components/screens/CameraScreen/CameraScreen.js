import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// TODO(sb): RN update dependencies fixes
import { RESULTS } from "react-native-permissions";
import { withNavigationFocus } from "react-navigation";
import { RNCamera } from "react-native-camera";
import ImageEditor from "@react-native-community/image-editor";
import ImagePicker from "react-native-image-crop-picker";
import * as appActions from "../../../redux/actions";
import CameraScreenStyle from "./CameraScreen.styles";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import API from "../../../constants/API";
import CelText from "../../atoms/CelText/CelText";
import loggerUtil from "../../../utils/logger-util";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import {
  ALL_PERMISSIONS,
  requestForPermission,
} from "../../../utils/device-permissions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

const { height, width } = Dimensions.get("window");

@connect(
  state => ({
    cameraType: state.camera.cameraType,
    cameraRollLastPhoto: state.camera.cameraRollPhotos.length
      ? state.camera.cameraRollPhotos[0]
      : null,
    photo: state.camera.photo,
    cameraField: state.camera.cameraField,
    cameraHeading: state.camera.cameraHeading,
    cameraCopy: state.camera.cameraCopy,
    mask: state.camera.mask,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const hideBack = navigation.getParam("hideBack");

    return {
      headerSameColor: false,
      transparent: true,
      hideBack,
      gesturesEnabled: false,
    };
  };

  static propTypes = {
    cameraField: PropTypes.string,
    cameraHeading: PropTypes.string,
    cameraCopy: PropTypes.string,
    cameraType: PropTypes.oneOf(["front", "back"]),
    photo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Object),
    ]),
    mask: PropTypes.oneOf(["circle", "utility"]),
    onSave: PropTypes.func,
  };

  static defaultProps = {
    cameraField: "lastPhoto",
    cameraHeading: "Take Photo",
    mask: "circle",
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: false,
      hasCameraRollPermission: false,
      takingPhoto: false,
      hasInitialPhoto: !!props.photo,
      size: {
        width,
        height,
      },
    };
  }

  async componentDidMount() {
    const { actions } = this.props;
    actions.setFabType("hide");
    await this.getCameraPermissions();
    await this.getCameraRollPermissions();
  }

  componentDidUpdate() {
    const { actions, activeScreen } = this.props;
    if (activeScreen === SCREENS.CAMERA_SCREEN) {
      actions.setFabType("hide");
    }
  }

  getCameraPermissions = async () => {
    const { actions } = this.props;
    const perm = await requestForPermission(ALL_PERMISSIONS.CAMERA);

    if (perm === RESULTS.GRANTED) {
      this.setState({ hasCameraPermission: true });
    } else {
      actions.showMessage(
        "warning",
        "It looks like you denied Celsius app access to your camera. Please enable it in your phone settings."
      );
      actions.navigateBack();
    }
  };

  getCameraRollPermissions = async () => {
    const { actions, cameraRollLastPhoto } = this.props;
    const perm = await requestForPermission(ALL_PERMISSIONS.LIBRARY);

    if (perm === RESULTS.GRANTED) {
      if (!cameraRollLastPhoto) actions.getCameraRollPhotos();
      this.setState({ hasCameraRollPermission: true });
    } else {
      actions.showMessage(
        "warning",
        "It looks like you denied Celsius app access to your camera roll. Please enable it in your phone settings."
      );
    }
  };

  getMaskImage = mask => {
    switch (mask) {
      case "utility":
        return {
          lightSource: require("../../../../assets/images/mask/bill-mask-markers-light.png"),
          darkSource: require("../../../../assets/images/mask/bill-mask-markers-dark.png"),
        };
      case "circle":
      default:
        return {
          lightSource: require("../../../../assets/images/mask/circle-mask.png"),
          darkSource: require("../../../../assets/images/mask/dark-circle-mask.png"),
        };
    }
  };

  pickImage = async () => {
    const { actions, mask, navigation } = this.props;
    const maskType = mask || "utility";
    try {
      const result = await ImagePicker.openPicker({
        width: STYLES.CAMERA_MASK_SIZES[maskType].width,
        height: STYLES.CAMERA_MASK_SIZES[maskType].height,
        cropping: true,
      });
      if (result.cancelled) {
        return;
      }
      actions.navigateTo(SCREENS.CONFIRM_CAMERA, {
        onSave: navigation.getParam("onSave"),
      });
      actions.takeCameraPhoto({ uri: result.path });
    } catch (err) {
      if (err.message === "User cancelled image selection") return;
      loggerUtil.err(err);
    }
  };

  takePhoto = async camera => {
    if (camera) {
      const { actions, mask, navigation } = this.props;
      const hideBack = navigation.getParam("hideBack");
      const maskType = mask || "utility";
      const options = {
        quality: 0.5,
        orientation:
          Platform.OS === "ios"
            ? RNCamera.Constants.Orientation.auto
            : RNCamera.Constants.Orientation.portrait,
        pauseAfterCapture: true,
        fixOrientation: true,
        base64: true,
      };

      try {
        if (!this.state.hasCameraPermission) {
          return await this.getCameraPermissions();
        }
        const photo = await camera.takePictureAsync(options);

        actions.startApiCall(API.TAKE_CAMERA_PHOTO);
        await actions.navigateTo(SCREENS.CONFIRM_CAMERA, {
          documentPicture: hideBack,
          onSave: navigation.getParam("onSave"),
        });

        const { size } = this.state;
        let cropWidth;

        if (photo.width / photo.height > size.width / size.height) {
          const coef = photo.width * (size.height / photo.height);
          const overScan = ((coef - size.width) * 0.5) / coef;
          cropWidth = photo.width - 2 * size.width * overScan;
          cropWidth =
            (cropWidth * STYLES.CAMERA_MASK_SIZES[maskType].width) / size.width;
        } else {
          cropWidth =
            (STYLES.CAMERA_MASK_SIZES[maskType].width / size.width) *
            photo.width;
        }

        const cropHeight =
          (cropWidth / STYLES.CAMERA_MASK_SIZES[maskType].width) *
          STYLES.CAMERA_MASK_SIZES[maskType].height;

        const croppedImage = await ImageEditor.cropImage(photo.uri, {
          offset: {
            x: (photo.width - cropWidth) / 2,
            y: (photo.height - cropHeight) / 2,
          },
          size: { width: cropWidth, height: cropHeight },
          displaySize: { width: cropWidth, height: cropHeight },
          resizeMode: "cover",
        });

        actions.takeCameraPhoto({ uri: croppedImage });
      } catch (err) {
        loggerUtil.err(err);
      }
    }
  };

  pressCircle = async () => {
    this.setState({ takingPhoto: true });
    await this.takePhoto(this.camera);
    this.setState({ takingPhoto: false });
  };

  renderMask = () => {
    const { mask, cameraHeading, cameraCopy } = this.props;
    const maskType = mask || "utility";
    const imageSource = this.getMaskImage(maskType);
    const style = CameraScreenStyle();
    return (
      <View
        style={{
          alignSelf: "center",
          flex: 1,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View
          style={[style.mask, style.maskOverlayColor, { alignItems: "center" }]}
        >
          <SafeAreaView
            style={{
              flex: 1,
              alignItems: "center",
              paddingTop: 20,
              marginBottom: 20,
              width,
            }}
          >
            <CelText
              type="H3"
              weight="700"
              align="center"
              margin="5 0 20 0"
              style={{ width: "80%" }}
            >
              {cameraHeading}
            </CelText>
            <CelText type="H5" align="center" style={{ width: "80%" }}>
              {cameraCopy}
            </CelText>
          </SafeAreaView>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[style.mask, style.maskOverlayColor]} />

          <ThemedImage
            {...imageSource}
            style={{
              width: STYLES.CAMERA_MASK_SIZES[maskType].width,
              height: STYLES.CAMERA_MASK_SIZES[maskType].height,
              alignSelf: "center",
            }}
          />
          <View style={[style.mask, style.maskOverlayColor]} />
        </View>
        <View style={[style.mask, style.maskOverlayColor]}>
          <View
            style={{
              width: STYLES.CAMERA_MASK_SIZES[maskType].width,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { cameraType, actions, cameraRollLastPhoto } = this.props;
    const { takingPhoto } = this.state;
    const style = CameraScreenStyle();
    const Mask = this.renderMask;
    const isFocused = this.props.navigation.isFocused();

    if (!isFocused) return null;

    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        onLayout={event => {
          this.setState({ size: event.nativeEvent.layout });
        }}
        style={style.camera}
        type={RNCamera.Constants.Type[cameraType]}
        captureAudio={false}
      >
        <Mask />
        <SafeAreaView style={style.bottomView}>
          <View style={style.actionBar}>
            <TouchableOpacity style={{ flex: 1 }} onPress={this.pickImage}>
              {cameraRollLastPhoto && (
                <Image
                  source={{ uri: cameraRollLastPhoto.node.image.uri }}
                  resizeMode="cover"
                  style={{ width: 50, height: 50 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.pressCircle}
              disabled={takingPhoto}
            >
              <Icon
                name="Shutter"
                fill={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
                width="60"
                height="60"
                iconOpacity={takingPhoto ? 0.5 : 1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ ratio: "4:3" }, actions.flipCamera);
              }}
            >
              <Icon style={{ alignSelf: "flex-end" }} name="Swap" width="35" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </RNCamera>
    );
  }
}

export default withNavigationFocus(CameraScreen);
