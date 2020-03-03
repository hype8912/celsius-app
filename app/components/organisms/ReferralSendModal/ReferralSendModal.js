import React, { Component } from 'react'
import { View, Share } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";



// import ReferralReceivedModalStyle from "./ReferralReceivedModal.styles";
import CelModal from '../CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import CelButton from '../../atoms/CelButton/CelButton'
import CopyButton from "../../atoms/CopyButton/CopyButton";
import ReferralSendModalStyle from './ReferralSendModal.styles';

@connect(
  state => ({
    referralLink: state.branch.registeredLink,
    openedModal: state.ui.openedModal,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ReferralSendModal extends Component {

  static propTypes = {
    code: PropTypes.string,
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      // string: propTypes.string
    };
  }

  componentDidUpdate(prevProps) {
    const { actions, openedModal } = prevProps;

    if (this.props.openedModal === MODALS.REFERRAL_SEND_MODAL && openedModal !== MODALS.REFERRAL_SEND_MODAL && !this.props.user.individual_referral_link) {
      actions.getBranchIndividualLink();
    }
  }
  getSlug = (link) => link.split("/")[link.split("/").length - 1];

  getShare = (link) => link;

  render() {

    const { actions, user } = this.props;
    const style = ReferralSendModalStyle();

    if (!user.individual_referral_link) return null;

    const slug = this.getSlug(user.individual_referral_link);
    const shareLink = this.getShare(user.individual_referral_link)

    return (
      <CelModal name={MODALS.REFERRAL_SEND_MODAL}
        picture={require('../../../../assets/images/icons/referrals/dog.png')}
        style={{ paddingBottom: 30 }}
      >
        <CelText type="H2" weight="bold" align={"center"} style={{ paddingTop: 30 }}>Refer your friends!</CelText>

        <CelText color={STYLES.COLORS.DARK_GRAY} align={"center"} weight='300' style={style.explanation}>Use your unique promo code or link to invite your friends to Celsius. You’ll both receive up to <CelText weight='600'>$20 </CelText>when they join*!</CelText>

        <View style={style.copyShareWrapper}>
          <View styles={{ backgroundColor: 'red', paddingTop: 10 }}>
            <CelText align={"center"} weight={"400"} type={"H4"} >{slug}</CelText>
          </View>
          <Separator style={{ backgroundColor: 'red' }} margin={"20 0 0 0"} />
          <View style={style.copyShareButtonsWrapper}>
            <CopyButton copyText={slug} onCopy={() => actions.showMessage("success", "Promo code key copied to clipboard!")} />
          </View>
        </View>
        <View style={style.shareWrapper}>
          <CelButton onPress={() => Share.share({ message: shareLink })}>
            Share a unique link
        </CelButton>
        </View>
        <CelText type='H6' align={"left"} style={style.explanation}>*$10 in BTC distributed after initial deposit of $1,000 or more in the first five days. Additional $10 bonus distributed after keeping $1,000 or more for 90 days. Wallet balance value is based on time of deposit. </CelText>
      </CelModal>

    );
  }
}
export default ReferralSendModal
