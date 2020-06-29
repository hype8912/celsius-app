import React from "react";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ReferralReceivedModal from "./ReferralReceivedModal";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";
import { DEEP_LINKS } from "../../../constants/DATA";

const referralLinks = {
  [DEEP_LINKS.INDIVIDUAL_REFERRAL]: {
    owner: {
      display_name: "Nuke",
    },
    link_type: DEEP_LINKS.INDIVIDUAL_REFERRAL,
    referred_award_amount: 200,
    referred_award_base_currency: "CEL",
    referred_award_coin: "CEL",
  },
  [DEEP_LINKS.COMPANY_REFERRAL]: {
    owner: {},
    link_type: DEEP_LINKS.COMPANY_REFERRAL,
    referred_award_amount: 0.01,
    referred_award_base_currency: "BTC",
    referred_award_coin: "CEL",
    minimum_deposit_for_reward: 1800,
  },
};

class ReferralReceivedModalStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLink: referralLinks[DEEP_LINKS.INDIVIDUAL_REFERRAL],
    };
  }

  render() {
    return (
      <StoryWrapper title="Referral Received Modal">
        <CelText margin="0 0 10 0">Referred from individual link:</CelText>
        <CelButton
          onPress={() => {
            this.setState({
              activeLink: referralLinks[DEEP_LINKS.INDIVIDUAL_REFERRAL],
            });
            store.dispatch(openModal(MODALS.REFERRAL_RECEIVED_MODAL));
          }}
        >
          Open Individual
        </CelButton>

        <CelText margin="15 0 10 0">Referred from company link:</CelText>
        <CelButton
          onPress={() => {
            this.setState({
              activeLink: referralLinks[DEEP_LINKS.COMPANY_REFERRAL],
            });
            store.dispatch(openModal(MODALS.REFERRAL_RECEIVED_MODAL));
          }}
        >
          Open Company
        </CelButton>

        <ReferralReceivedModal
          referralLink={this.state.activeLink}
          navigateTo={() => {}}
          closeModal={() => {}}
        />
      </StoryWrapper>
    );
  }
}

export default ReferralReceivedModalStories;
