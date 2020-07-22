import React, { Component } from "react";
import { View, Animated, ScrollView, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS } from "../../../constants/UI";
import MultistepModalStyles from "./MultistepModal.styles";
import {
  getColor,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import CelModal from "../CelModal/CelModal";
import multiStepUtil from "../../../utils/multistep-modal-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    modalHeight: PropTypes.number,
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
    modalHeight: 40,
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

  componentWillUpdate(nextProps) {
    const { openedModal, name } = this.props;

    // Modal is opening
    if (openedModal !== name && nextProps.openedModal === name) {
      multiStepUtil.setModal(this);
    }

    // Modal is closing
    if (openedModal === name && nextProps.openedModal !== name) {
      multiStepUtil.setModal();
    }
  }

  onMomentumScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const activeStep = Math.floor(contentOffset.x / cardWidth);
    multiStepUtil.setActiveStep(activeStep);
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
          outputRange: [1, 1, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  });

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
                backgroundColor: getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE),
                margin: 5,
                borderRadius: 4,
              }}
            />
          );
        })}
      </View>
    );
  }

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

  render() {
    const {
      name,
      children,
      verticalScroll,
      imagesArray,
      modalHeight,
    } = this.props;
    const { xOffset } = this.state;

    const style = MultistepModalStyles();

    return (
      <CelModal name={name}>
        <View>
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

          <Animated.ScrollView
            style={{ height: heightPercentageToDP(`${modalHeight}%`) }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={c => (this.scrollRef = c)}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
          >
            {children.map((step, i) => (
              <View key={i}>
                <Animated.View
                  style={[style.screen, this.transitionAnimation(i)]}
                >
                  {verticalScroll ? (
                    <ScrollView>
                      <View style={style.modalContent}>{step}</View>
                    </ScrollView>
                  ) : (
                    <View style={style.modalContent}>{step}</View>
                  )}
                </Animated.View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </CelModal>
    );
  }
}

export default MultistepModal;
