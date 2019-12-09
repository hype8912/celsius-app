import React from "react";

import store from "../../../redux/store";
import { closeModal, openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import WithdrawalInfoModal from "./WithdrawalInfoModal";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

class WithdrawalInfoModalStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: null,
    };
  }

  render = () => (
    <StoryWrapper title="Withdrawal Info Modal">
      <CelText margin="0 0 10 0">Default:</CelText>
      <CelButton
        onPress={() => {
          this.setState({ type: null });
          store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL));
        }}
      >
        Open Info Modal
      </CelButton>

      <CelText margin="0 0 10 0">For CEL Token:</CelText>
      <CelButton
        onPress={() => {
          this.setState({ type: "CEL" });
          store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL));
        }}
      >
        Open CEL Modal
      </CelButton>

      <CelText margin="0 0 10 0">For DAI Token:</CelText>
      <CelButton
        onPress={() => {
          this.setState({ type: "DAI" });
          store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL));
        }}
      >
        Open DAI Modal
      </CelButton>

      <WithdrawalInfoModal
        type={this.state.type}
        withdrawalSettings={{ daily_withdrawal_limit: 20000 }}
        closeModal={() => store.dispatch(closeModal())}
      />
    </StoryWrapper>
  );
}

export default WithdrawalInfoModalStories;
