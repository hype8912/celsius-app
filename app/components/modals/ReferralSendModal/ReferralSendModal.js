import React, { Component } from "react";
import PropTypes from "prop-types";
import { Share, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import ReferralSendModalStyle from "./ReferralSendModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import CelButton from "../../atoms/CelButton/CelButton";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      // string: propTypes.string
    };
  }

  componentDidUpdate(prevProps) {
    const { actions, openedModal } = prevProps;

    if (
      this.props.openedModal === MODALS.REFERRAL_SEND_MODAL &&
      openedModal !== MODALS.REFERRAL_SEND_MODAL &&
      !this.props.user.individual_referral_link
    ) {
      actions.getBranchIndividualLink();
    }
  }

  getSlug = link => link.split("/")[link.split("/").length - 1];

  getShare = link => link;

  render() {
    const { actions, user } = this.props;

    const style = ReferralSendModalStyle();
    const link = user.individual_referral_link;
    if (!link) return null;

    const slug = this.getSlug(link);
    const shareLink = this.getShare(link);
    return (
      <CelModal style={style.container} name={MODALS.REFERRAL_SEND_MODAL}>
        <CelText type="H2" weight="bold" align={"center"} margin={"0 0 25 0"}>
          Refer and earn!
        </CelText>

        <CelText align={"center"} style={style.explanation}>
          Earn $20 in BTC when a friend joins Celsius Network with your unique
          referral link!*
        </CelText>

        <View style={style.copyShareWrapper}>
          <View>
            <CelText
              align={"center"}
              weight={"bold"}
              type={"H4"}
              color={getColor(COLOR_KEYS.HEADLINE)}
            >
              {slug}
            </CelText>
          </View>
          <Separator
            margin={"20 0 0 0"}
            color={getColor(COLOR_KEYS.PARAGRAPH)}
          />
          <View style={style.copyShareButtonsWrapper}>
            <CopyButton
              copyText={slug}
              onCopy={() => {
                actions.setBannerProps({ lastReferral: moment.utc().format() });
                mixpanelAnalytics.userReferring();
                actions.showMessage(
                  "success",
                  "Promo code key copied to clipboard!"
                );
              }}
            />
          </View>
        </View>
        <View style={style.shareWrapper}>
          <CelButton
            onPress={() => {
              actions.setBannerProps({ lastReferral: moment.utc().format() });
              Share.share({
                message: `Join Celsius Network using my referral code ${slug} when signing up and earn $20 in BTC with your first transfer of $200 or more! #UnbankYourself \n \n${shareLink}`,
              });
              mixpanelAnalytics.userReferring();
            }}
          >
            Share a unique link
          </CelButton>
        </View>
        <CelText type="H6" align={"left"} style={style.explanation}>
          *$20 in BTC is distributed when a new user makes a first transfer of
          $200 or more using your referral code at the time of signup. BTC
          reward will be unlocked 30 days after the initial transfer.
        </CelText>
      </CelModal>
    );
  }
}

export default ReferralSendModal;
