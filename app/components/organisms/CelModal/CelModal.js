import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BlurView } from "@react-native-community/blur";

import * as appActions from "../../../redux/actions";
import CelModalStyle from "./CelModal.styles";
import Icon from "../../atoms/Icon/Icon";

import { MODALS, THEMES } from "../../../constants/UI";
import {
  heightPercentageToDP,
  widthPercentageToDP,
  getPadding,
  addThemeToComponents,
} from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import Message from "../../molecules/Message/Message";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";

const cardWidth = widthPercentageToDP("80%");
const { width } = Dimensions.get("window");

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    header: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    marginTop: PropTypes.number,
    height: PropTypes.number,
    noScroll: PropTypes.bool,
    onClose: PropTypes.func,
    padding: PropTypes.string,
    onBackdropPress: PropTypes.func,
    pictureCircle: PropTypes.bool,
    content: PropTypes.instanceOf(Array),
    index: PropTypes.number,
    modalInfo: PropTypes.instanceOf(Array),
    modalType: PropTypes.string,
  };
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    noScroll: false,
    pictureCircle: false,
    // marginTop: heightPercentageToDP("15%"),
    // height: heightPercentageToDP("65%"),
    modalInfo: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      xOffset: new Animated.Value(0),
    };
  }

  getTintColor = () => {
    const { theme } = this.props;
    return {
      light: "light",
      dark: "dark",
      celsius: "dark",
    }[theme];
  };

  transitionAnimation = index => ({
    transform: [
      { perspective: 800 },
      {
        scale: this.state.xOffset.interpolate({
          inputRange: [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth,
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: "clamp",
        }),
      },
    ],
  });

  renderImage = () => {
    const { picture, pictureCircle, modalInfo } = this.props;
    const style = CelModalStyle();

    if (!picture) return modalInfo && this.renderMultiStepPicture();
    if (pictureCircle)
      return (
        <View style={style.imageWrapperCircle}>
          <Image
            source={picture}
            style={style.modalImageCircle}
            resizeMode="contain"
          />
        </View>
      );
    return (
      <View style={style.imageWrapper}>
        <Image source={picture} style={style.modalImage} resizeMode="contain" />
      </View>
    );
  };

  renderModalContent() {
    const { xOffset } = this.state;
    const { modalInfo, actions } = this.props;
    const style = CelModalStyle();

    return (
      <View>
        <ScrollView>
          <Animated.ScrollView
            style={{ flexGrow: 1 }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            onScrollEndDrag={this.scroll}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {modalInfo.map((step, index) => (
              <View>
                <Animated.View
                  key={index}
                  style={[style.screen, this.transitionAnimation(index)]}
                >
                  <CelText type="H2" weight="bold" style={style.title}>
                    {step.title}
                  </CelText>
                  <CelText type="H4" style={style.description}>
                    {step.description}
                  </CelText>
                  {step.buttonText.toLowerCase() !== "continue" ? (
                    <CelButton
                      margin={"20 0 20 0"}
                      onPress={() => actions.closeModal()}
                    >
                      {step.buttonText}
                    </CelButton>
                  ) : null}
                </Animated.View>
              </View>
            ))}
          </Animated.ScrollView>
        </ScrollView>
      </View>
    );
  }

  renderMultiStepPicture() {
    const { modalInfo } = this.props;

    const position = Animated.divide(this.state.xOffset, width);

    return modalInfo.map((step, index) => {
      const opacity = position.interpolate({
        inputRange: [
          index - 0.5000000001,
          index - 0.5,
          index,
          index + 0.5,
          index + 0.50000001,
        ],
        outputRange: [0, 1, 1, 1, 0],
        extrapolate: "clamp",
      });
      return (
        <Animated.Image
          key={index}
          style={{
            opacity,
            height: 150,
            width: 150,
            position: "absolute",
            zIndex: 1,
            top: -heightPercentageToDP("20%") / 4,
            alignSelf: "center",
          }}
          source={step.image}
        />
      );
    });
  }

  renderDots() {
    const { modalInfo, modalType } = this.props;
    const style = CelModalStyle();

    const position = Animated.divide(this.state.xOffset, width);

    return (
      <View
        style={
          modalType === "withdraw" ? style.dotsWithdraw : style.dotsDeposit
        }
      >
        {modalInfo.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i - 0.9, i, i + 0.3, i + 0.30000001],
            outputRange: [0.3, 1, 1, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 10,
                width: 10,
                backgroundColor: STYLES.COLORS.MEDIUM_GRAY,
                margin: 8,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    );
  }

  render() {
    const {
      openedModal,
      name,
      actions,
      shouldRenderCloseButton,
      children,
      header,
      primaryText,
      secondaryText,
      picture,
      noScroll,
      onClose,
      padding,
      modalInfo,
      modalType,
    } = this.props;
    const style = CelModalStyle();
    const paddingStyle = padding ? getPadding(padding) : {};

    let scrollWrapper;

    if (modalType === "withdraw") scrollWrapper = style.contentWrapperWithdraw;
    else if (modalType === "deposit")
      scrollWrapper = style.contentWrapperDeposit;
    else if (modalType === "celPay") scrollWrapper = style.contentWrapperCelPay;
    else scrollWrapper = style.contentWrapper;

    let size;
    if (picture) size = { paddingVertical: heightPercentageToDP("18%") };
    else if (!picture && modalType === "withdraw")
      size = { paddingVertical: heightPercentageToDP("14%") };
    else size = { paddingVertical: heightPercentageToDP("8%") };

    const childrenWithProps = addThemeToComponents(
      children,
      [CelText.displayName, CelInput.displayName],
      THEMES.LIGHT
    );
    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
        modalInfo={modalInfo}
      >
        <Message />
        <View style={[style.wrapper, size]}>
          <View style={style.modal}>
            {this.renderImage()}
            {!!modalInfo && modalInfo.length > 1 && this.renderDots()}
            {shouldRenderCloseButton ? (
              <TouchableOpacity
                style={style.closeBtn}
                onPress={() => {
                  actions.closeModal();
                  if (onClose) onClose();
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
            ) : null}
            {header ? (
              <View style={style.modalHeadingWrapper}>
                <CelText theme={THEMES.LIGHT} type={"H1"}>
                  {primaryText}
                </CelText>
                <CelText theme={THEMES.LIGHT} type={"H3"} weight={"400"}>
                  {secondaryText}
                </CelText>
              </View>
            ) : null}
            {noScroll ? (
              <View
                style={[
                  style.contentWrapper,
                  {
                    marginTop: header
                      ? heightPercentageToDP("15.3%")
                      : heightPercentageToDP("8%"),
                  },
                  paddingStyle,
                ]}
              >
                {!!modalInfo && this.renderModalContent()}
                {childrenWithProps}
              </View>
            ) : (
                <View>
                  <ScrollView
                    style={[
                      scrollWrapper,
                      {
                        marginTop: header
                          ? heightPercentageToDP("15.3%")
                          : heightPercentageToDP("2%"),
                      },
                      paddingStyle,
                    ]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                  >
                    {!!modalInfo && this.renderModalContent()}
                    {childrenWithProps}
                  </ScrollView>
                </View>
              )}
          </View>
          <BlurView
            tint={"dark"}
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={style.outsideCloseModal}
            onPress={() => {
              actions.closeModal();
              if (onClose) onClose();
            }}
          />
        </View>
      </Modal>
    );
  }
}

export default CelModal;
