import React, { Component } from "react";
import { View, Share } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../../redux/actions";
import Separator from "../../../atoms/Separator/Separator";
import STYLES from "../../../../constants/STYLES";

// import ReferralReceivedModalStyle from "./ReferralReceivedModal.styles";
import CelModal from "../../../organisms/CelModal/CelModal";
import { MODALS } from "../../../../constants/UI";
import CelText from "../../../atoms/CelText/CelText";
import CelButton from "../../../atoms/CelButton/CelButton";
import CopyButton from "../../../atoms/CopyButton/CopyButton";
import ReferralSendModalStyle from "./ReferralSendModal.styles";

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

    if (!user.individual_referral_link) return null;

    const slug = this.getSlug(user.individual_referral_link);
    const shareLink = this.getShare(user.individual_referral_link);

    return (
      <CelModal
        name={MODALS.REFERRAL_SEND_MODAL}
        picture={require("../../../../../assets/images/icons/referrals/dog.png")}
        style={{ paddingBottom: 30 }}
      >
        <CelText
          type="H2"
          weight="bold"
          align={"center"}
          style={{ paddingTop: 60 }}
        >
          Refer and earn!
        </CelText>

        <CelText
          color={STYLES.COLORS.DARK_GRAY}
          align={"center"}
          weight="300"
          style={style.explanation}
        >
          Earn $10 in BTC when a friend joins Celsius Network with your unique
          referral link!*
        </CelText>

        <View style={style.copyShareWrapper}>
          <View styles={{ backgroundColor: "red", paddingTop: 10 }}>
            <CelText align={"center"} weight={"400"} type={"H4"}>
              {slug}
            </CelText>
          </View>
          <Separator style={{ backgroundColor: "red" }} margin={"20 0 0 0"} />
          <View style={style.copyShareButtonsWrapper}>
            <CopyButton
              copyText={slug}
              onCopy={() =>
                actions.showMessage(
                  "success",
                  "Promo code key copied to clipboard!"
                )
              }
            />
          </View>
        </View>
        <View style={style.shareWrapper}>
          <CelButton
            onPress={() =>
              Share.share({
                message: `Join Celsius Network using my referral code ${slug} when signing up and earn $10 in BTC with your first deposit of $200 or more! #UnbankYourself \n \n${shareLink}`,
              })
            }
          >
            Share a unique link
          </CelButton>
        </View>
        <CelText type="H6" align={"left"} style={style.explanation}>
          *$10 in BTC is distributed when a new user makes a first deposit of
          $200 or more using your referral code at the time of signup.
        </CelText>
      </CelModal>
    );
  }
}
export default ReferralSendModal;
