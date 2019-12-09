import React from "react";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import DepositInfoModal from "./DepositInfoModal";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

class DepositInfoModalStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "XRP",
    };
  }

  render = () => (
    <StoryWrapper title="Deposit Info Modal">
      <CelText margin="0 0 10 0">Deposit ERC20 token modal:</CelText>
      <CelButton
        style={{ marginBottom: 5 }}
        onPress={() => {
          this.setState({ type: "USDT ERC20" });
          store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
        }}
      >
        Open for USDT ERC20
      </CelButton>
      <CelText margin="15 0 10 0">Deposit XRP token modal:</CelText>
      <CelButton
        onPress={() => {
          this.setState({ type: "XRP" });
          store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
        }}
      >
        Open for XRP
      </CelButton>

      <DepositInfoModal
        onPressConfirm={action("onPressConfirm")}
        type={this.state.type}
      />
    </StoryWrapper>
  );
}

export default DepositInfoModalStories;
