import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BlurView } from "@react-native-community/blur";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS, THEMES } from "../../../constants/UI";
import CelModalStyle from "./CelModal.styles";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import { getTheme } from "../../../utils/styles-util";
import { isIos } from "../../../utils/ui-util";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    theme: state.user.appSettings.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    hasCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    darkPicture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    pictureDimensions: PropTypes.instanceOf(Object),
    onClose: PropTypes.func,
    coin: PropTypes.string,
  };
  static defaultProps = {
    hasCloseButton: true,
    picture: null,
    pictureDimensions: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      modalPosition: { justifyContent: "flex-end" },
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      modalPosition: { justifyContent: "flex-start" },
    });
  };

  keyboardDidHide = () => {
    this.setState({
      modalPosition: { justifyContent: "flex-end" },
    });
  };

  getTintColor = () => {
    const { theme } = this.props;
    const style = CelModalStyle();

    switch (theme) {
      case THEMES.DARK:
      case THEMES.CELSIUS:
        return {
          color: "extraDark",
          blur: 100,
          androidColor: style.outsideCloseModal.backgroundColor,
        };
      case THEMES.LIGHT:
      default:
        return {
          color: "dark",
          blur: 70,
          androidColor: style.outsideCloseModal.backgroundColor,
        };
    }
  };

  renderPicture = () => {
    const { picture, darkPicture, pictureDimensions, coin } = this.props;
    const style = CelModalStyle();
    const pictureStyle = [style.pictureStyle, pictureDimensions];
    const theme = getTheme();

    if (!darkPicture && theme === THEMES.DARK) {
      // NOTE: For coins we use PNG in light theme and DVG in dark theme
      return (
        <View style={style.pictureWrapper}>
          <Icon name={`Icon${coin && coin}`} fill={STYLES.COLORS.WHITE} />
        </View>
      );
    }

    return (
      <View style={style.pictureWrapper}>
        <ThemedImage
          lightSource={picture}
          style={pictureStyle}
          resizeMode="contain"
          darkSource={darkPicture}
        />
      </View>
    );
  };

  renderClose = () => {
    const { actions, onClose } = this.props;
    const style = CelModalStyle();

    return (
      <TouchableOpacity
        style={style.closeBtn}
        onPress={() => {
          if (onClose) onClose();
          actions.closeModal();
        }}
      >
        <Icon
          name="Close"
          height="15"
          width="15"
          viewBox="0 0 1000 1000"
          fill={"#3D4853"}
          marginTop={20}
        />
      </TouchableOpacity>
    );
  };

  backdrop = () => {
    const { actions } = this.props;
    const tintColor = this.getTintColor();
    return isIos() ? (
      <TouchableWithoutFeedback
        onPress={() => {
          actions.closeModal();
        }}
      >
        <BlurView
          blurType={tintColor.color}
          blurAmount={tintColor.blur}
          style={[StyleSheet.absoluteFill]}
        />
      </TouchableWithoutFeedback>
    ) : null;
  };

  render() {
    const {
      openedModal,
      name,
      children,
      picture,
      hasCloseButton,
      actions,
    } = this.props;
    const { modalPosition } = this.state;
    const style = CelModalStyle();
    const tintColor = this.getTintColor();

    return (
      <Modal
        isVisible={openedModal === name}
        hasBackdrop
        avoidKeyboard
        backdropColor={tintColor.androidColor}
        customBackdrop={this.backdrop()}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        onBackdropPress={() => actions.closeModal()}
        useNativeDriver={!isIos()}
      >
        <View style={[style.wrapper, modalPosition]}>
          <View style={style.modal}>
            <View style={{ height: picture || hasCloseButton ? 50 : 0 }}>
              {!!hasCloseButton && this.renderClose()}
              {!!picture && this.renderPicture()}
            </View>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
}

export default CelModal;
