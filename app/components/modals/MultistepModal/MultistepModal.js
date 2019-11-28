import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BlurView } from "expo-blur";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS } from "../../../constants/UI";
import MultistepModalStyles from "./MultistepModal.styles";
import Icon from "../../atoms/Icon/Icon";
import { widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const cardWidth = widthPercentageToDP("80%");
const { width } = Dimensions.get("window");

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MultistepModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    hasCloseButton: PropTypes.bool,
    verticalScroll: PropTypes.bool,
    imagesArray: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.number])
    ),
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    top: PropTypes.number,
  };
  static defaultProps = {
    hasCloseButton: true,
    imagesArray: [],
    verticalScroll: false,
    imageWidth: 30,
    imageHeight: 30,
    top: 20,
  };

  constructor(props) {
    super(props);

    this.state = {
      xOffset: new Animated.Value(0),
    };
  }

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
          outputRange: [1, 1, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  });

  renderMultiStepPicture() {
    const { imagesArray, imageHeight, imageWidth, top } = this.props;
    const position = Animated.divide(this.state.xOffset, width);
    return (
      imagesArray &&
      imagesArray.map((step, index) => {
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
          <View style={{ zIndex: 10000000 }} key={index}>
            <Animated.Image
              style={{
                opacity,
                height: imageHeight,
                width: imageWidth,
                position: "absolute",
                zIndex: 1,
                top,
                alignSelf: "center",
              }}
              source={step}
            />
          </View>
        );
      })
    );
  }

  renderDots() {
    const { children } = this.props;
    const style = MultistepModalStyles();

    const position = Animated.divide(this.state.xOffset, width);

    return (
      <View style={style.dots}>
        {children.map((_, i) => {
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
                height: 8,
                width: 8,
                backgroundColor: STYLES.COLORS.MEDIUM_GRAY,
                margin: 5,
                borderRadius: 4,
              }}
            />
          );
        })}
      </View>
    );
  }

  renderClose = () => {
    const { actions } = this.props;
    const style = MultistepModalStyles();

    return (
      <TouchableOpacity
        style={style.closeBtn}
        onPress={() => {
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

  render() {
    const {
      openedModal,
      name,
      actions,
      children,
      hasCloseButton,
      verticalScroll,
      imagesArray,
    } = this.props;
    const { xOffset } = this.state;

    const style = MultistepModalStyles();

    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <View style={style.wrapper}>
          <View style={[style.modal]}>
            {!!hasCloseButton && this.renderClose()}
            {
              <View
                style={[
                  style.pictureWrapper,
                  imagesArray.length === 0 && style.pictureNoneWrapper,
                ]}
              >
                {imagesArray.length !== 0 && this.renderMultiStepPicture()}
              </View>
            }
            {this.renderDots()}

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
                {children.map((s, i) => (
                  <View key={i}>
                    <Animated.View
                      style={[style.screen, this.transitionAnimation(i)]}
                    >
                      {verticalScroll ? (
                        <ScrollView>
                          <View style={style.modalContent}>{s}</View>
                        </ScrollView>
                      ) : (
                        <View style={style.modalContent}>{s}</View>
                      )}
                    </Animated.View>
                  </View>
                ))}
              </Animated.ScrollView>
            </ScrollView>
          </View>
          <BlurView
            tint={"dark"}
            intensity={100}
            style={StyleSheet.absoluteFill}
          >
            <TouchableOpacity
              style={style.outsideCloseModal}
              onPress={() => {
                actions.closeModal();
              }}
            />
          </BlurView>
        </View>
      </Modal>
    );
  }
}

export default MultistepModal;
