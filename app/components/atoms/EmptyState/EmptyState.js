import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'

import EmptyStateStyle from './EmptyState.styles'
import CelText from '../CelText/CelText'
import CelButton from '../CelButton/CelButton'
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import ContactSupport from '../ContactSupport/ContactSupport'
import emptyStateUtil from '../../../utils/empty-state-util'
import STYLES from "../../../constants/STYLES";
import InfoModal from "../../molecules/InfoModal/InfoModal";


@connect(
  (state) => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class EmptyState extends Component {
  static propTypes = {
    purpose: PropTypes.oneOf(Object.keys(EMPTY_STATES)),
    image: PropTypes.string,
    aboveHeadingSection: PropTypes.element,
    heading: PropTypes.string,
    paragraphs: PropTypes.instanceOf(Array),
    button: PropTypes.string,
    onPress: PropTypes.func,
    support: PropTypes.bool,
    modal: PropTypes.element,
  }
  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = emptyStateUtil.getProps(props.purpose, props)
  }

  renderAboveHeadingSection() {
    const { actions } = this.props
    const emptyStateProps = {
      ...this.state,
      ...this.props
    }
    const {
      aboveHeadingSection,
    } = emptyStateProps

    switch (aboveHeadingSection) {
      case "kyc-rejected":
        return (
          <CelButton
            onPress={() => actions.openModal(MODALS.KYC_REJECTED_MODAL)}
            basic
            textColor={STYLES.COLORS.RED}
            iconRight={'IconChevronRight'}
            iconRightHeight={'13'}
            iconRightWidth={'12'}
            iconRightColor={STYLES.COLORS.RED}
          >
            Identity verification failed
          </CelButton>
        )
      case "kyc-pending":
        return (
          <CelText
            margin='0 0 0 0'
            align='center'
            type='H3'
            weight={'500'}
            color={STYLES.COLORS.ORANGE}
          >
            In progress
          </CelText>
        )
      default:
        return null
    }
  }

  renderModal() {
    const emptyStateProps = {
      ...this.state,
      ...this.props
    }
    const {
      modal,
      modalProps,
    } = emptyStateProps

    switch (modal) {
      case MODALS.KYC_REJECTED_MODAL:
        return <InfoModal  { ...modalProps } />
      default:
        return null
    }
  }

  render () {
    const emptyStateProps = {
      ...this.state,
      ...this.props
    }
    const {
      image,
      heading,
      paragraphs,
      onPress,
      button,
      support,
    } = emptyStateProps
    const style = EmptyStateStyle()

    return (
      <View style={style.container}>
        <View>
          <Image
            source={image || require('../../../../assets/images/diane-sad.png')}
            style={{ width: 140, height: 140, resizeMode: 'contain' }}
          />
        </View>

        { this.renderAboveHeadingSection() }

        <CelText margin='20 0 15 0' align='center' type='H2' weight={'bold'}>
          {heading}
        </CelText>

        {paragraphs &&
          paragraphs.map(paragraph => (
            <CelText
              margin='5 0 15 0'
              align='center'
              type='H4'
              weight={'300'}
              key={paragraph}
            >
              {paragraph}
            </CelText>
          ))}

        {button && onPress ? (
          <CelButton
            margin='10 0 10 0'
            onPress={onPress}
          >
            {button}
          </CelButton>
        ) : null}

        {support ? <ContactSupport /> : null}
        { this.renderModal() }
      </View>
    )
  }
}

export default EmptyState
