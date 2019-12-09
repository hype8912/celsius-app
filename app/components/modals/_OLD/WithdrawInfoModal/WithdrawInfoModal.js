import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";

import formatter from "../../../../utils/formatter";
import CelModal from "../../../organisms/CelModal/CelModal";
import { MODALS } from "../../../../constants/UI";

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
    type: PropTypes.string,
    withdrawalSettings: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { withdrawalSettings } = props;

    this.state = {
      currentStep: 1,
      xOffset: new Animated.Value(0),
      steps: [
        {
          image: require("../../../../../assets/images/illustrations-v3/PolarBearHODL3x.png"),
          title: "Are you sure you want to withdraw CEL?",
          description:
            "A withdrawal could affect your membership interest rates. Rates are determined by your loyalty level: the amount of CEL you HODL vs. the amount of other assets you hold. Please view our loyalty program.",
          buttonText: "Continue",
        },
        {
          image: require("../../../../../assets/images/illustrations-v3/PolarBearSad3x.png"),
          title: `Immediate withdrawals under ${withdrawalSettings &&
            formatter.usd(withdrawalSettings.maximum_withdrawal_amount)}`,
          description:
            "Celsius enables you to withdraw coins at any time. However, when exceeding this limit, withdrawals might be delayed for twenty-four (24) hours due to our security protocols.",
          buttonText: "Continue",
        },
        {
          image: require("../../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png"),
          title: "Don’t forget to check your withdrawal address",
          description:
            "Celsius uses a smart-contract based wallet for ETH and ERC20 coins, some wallets and exchanges (e.g. Bitfinex) do not support transactions from a smart-contract source. We recommend a one time test withdrawal with a small sum. Contact app@celsius.network if you are unsure.",
          buttonText: "Continue",
        },
        {
          image: require("../../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png"),
          title: "Transactions are safely secured with BitGo",
          description:
            "BitGo is a leading custodial service powering exchanges like Kraken and UPbit. Coins will be moved from time to time to exchanges or to Hedge funds borrowing coins in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured bank account.",
          buttonText: "Continue",
        },
      ],
    };
  }

  closeModalHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { steps } = this.state;
    const { type } = this.props;
    let array = [];

    if (type !== "CEL") {
      array = steps.slice(1, 4);
    } else {
      array = steps;
    }

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        onClose={this.closeModalHandler}
        modalInfo={array}
        modalType={"withdraw"}
      />
    );
  }
}

export default WithdrawInfoModal;
