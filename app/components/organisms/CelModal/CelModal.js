import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BlurView } from 'expo'


import * as appActions from '../../../redux/actions'
import CelModalStyle from './CelModal.styles'
import Icon from '../../atoms/Icon/Icon'

import { MODALS, THEMES } from '../../../constants/UI'
import {
  heightPercentageToDP,
  getPadding,
  addThemeToComponents
} from '../../../utils/styles-util'
import CelText from '../../atoms/CelText/CelText'
import CelInput from '../../atoms/CelInput/CelInput'
import Message from '../../molecules/Message/Message'

@connect(
  state => ({
    openedModal: state.ui.openedModal
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number
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
    pictureCircle: PropTypes.bool
  }
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    noScroll: false,
    pictureCircle: false
    // marginTop: heightPercentageToDP("15%"),
    // height: heightPercentageToDP("65%"),
  }

  getTintColor = () => {
    const { theme } = this.props
    return {
      light: 'light',
      dark: 'dark',
      celsius: 'dark'
    }[theme]
  }

  renderImage = () => {
    const { picture, pictureCircle } = this.props
    const style = CelModalStyle()

    if (!picture) return null;
    if (pictureCircle) return <View style={style.imageWrapperCircle}>
      <Image source={picture} style={style.modalImageCircle} resizeMode='contain' />
    </View>;

    return (
      <View style={style.imageWrapper}>
        <Image source={picture} style={style.modalImage} resizeMode='contain' />
      </View>
    )
  }

  render () {
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
      padding
    } = this.props
    const style = CelModalStyle()
    const paddingStyle = padding ? getPadding(padding) : {}
    // const tintColor = this.getTintColor();

    const size = picture
      ? { paddingVertical: heightPercentageToDP('18%') }
      : { paddingVertical: heightPercentageToDP('5%') }

    const childrenWithProps = addThemeToComponents(
      children,
      [CelText.displayName, CelInput.displayName],
      THEMES.LIGHT
    )

    return (
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <Message />

        <View style={[style.wrapper, size]}>
          <View style={style.modal}>
            {this.renderImage()}
            {shouldRenderCloseButton ? (
              <TouchableOpacity
                style={style.closeBtn}
                onPress={() => {
                  actions.closeModal()
                  if (onClose) onClose()
                }}
              >
                <View style={{ height: 50, width: 50, paddingTop: 16 }}>
                  <Icon
                    name='Close'
                    height='15'
                    width='15'
                    viewBox='0 0 1000 1000'
                    fill={'#3D4853'}
                    marginTop={20}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
            {header ? (
              <View style={style.modalHeadingWrapper}>
                <CelText theme={THEMES.LIGHT} type={'H1'}>
                  {primaryText}
                </CelText>
                <CelText theme={THEMES.LIGHT} type={'H3'} weight={'400'}>
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
                      ? heightPercentageToDP('15.3%')
                      : heightPercentageToDP('8%')
                  },
                  paddingStyle
                ]}
              >
                {childrenWithProps}
              </View>
            ) : (
              <ScrollView
                style={[
                  style.contentWrapper,
                  {
                    marginTop: header
                      ? heightPercentageToDP('15.3%')
                      : heightPercentageToDP('8%')
                  },
                  paddingStyle
                ]}
                showsVerticalScrollIndicator
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {childrenWithProps}
              </ScrollView>
            )}
          </View>
          <BlurView
            tint={'dark'}
            intensity={100}
            style={StyleSheet.absoluteFill}
          >
            <TouchableOpacity
              style={style.outsideCloseModal}
              onPress={() => {
                actions.closeModal()
                if (onClose) onClose()
              }}
            />
          </BlurView>
        </View>
      </Modal>
    )
  }
}

export default CelModal
