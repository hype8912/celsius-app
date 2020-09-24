import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ChoosePaymentMethodStyle from "./ChoosePaymentMethod.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PrepayDollarInterestModal from "../../modals/PrepayDollarInterestModal/PrepayDollarInterestModal";
import {
  LOAN_PAYMENT_REASONS,
  MODALS,
  COIN_CARD_TYPE,
} from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import { SCREENS } from "../../../constants/SCREENS";
import IconButton from "../../organisms/IconButton/IconButton";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import Separator from "../../atoms/Separator/Separator";
import Spinner from "../../atoms/Spinner/Spinner";
import DollarPaymentModal from "../../modals/DollarPaymentModal/DollarPaymentModal";
import loanPaymentUtil from "../../../utils/loanPayment-util";

@connect(
  state => ({
    loanSettings: state.loans.loanSettings,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    allLoans: state.loans.allLoans,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChoosePaymentMethod extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    const { navigation } = props;
    const id = navigation.getParam("id");

    this.state = {
      isAutomaticInterestPaymentEnabled: undefined,
      loading: false,
      loan: props.allLoans.find(l => l.id === id),
    };
  }

  static navigationOptions = ({ navigation }) => {
    const reason = navigation.getParam("reason");

    let title = "Setup Payment";
    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      title = "Prepay interest";
    }

    return {
      title,
      right: "profile",
      left: "back",
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loanSettings &&
      nextProps.loanSettings.automatic_interest_payment !==
        prevState.isAutomaticInterestPaymentEnabled
    ) {
      return {
        isAutomaticInterestPaymentEnabled:
          nextProps.loanSettings.automatic_interest_payment,
      };
    }
    return null;
  }

  componentDidMount() {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");
    actions.getLoanSettings(id);
  }

  getActiveCards = () => {
    const { navigation, loanSettings } = this.props;
    const reason = navigation.getParam("reason");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      return {
        cel: loanSettings.interest_payment_asset === "CEL",
        coin: !["CEL", "USD"].includes(loanSettings.interest_payment_asset),
        usd: loanSettings.interest_payment_asset === "USD",
      };
    }

    return {
      cel: false,
      coin: false,
      usd: false,
    };
  };

  resolve = (reason, id, payment, cel, loan) => {
    const { actions } = this.props;
    if (Number(loan.monthly_payment) > cel.amount_usd.toNumber()) {
      return actions.navigateTo(SCREENS.DEPOSIT, {
        coin: cel.short,
        reason: LOAN_PAYMENT_REASONS.PRINCIPAL,
        amountUsd: payment.additionalUsdAmount,
        additionalCryptoAmount: payment.additionalCryptoAmount,
      });
    }
    return actions.navigateTo(SCREENS.PAYMENT_CEL, { reason, id });
  };

  getCardProps = () => {
    const { actions, navigation, loyaltyInfo, walletSummary } = this.props;
    const { loan } = this.state;
    const celDiscount = formatter.percentageDisplay(
      loyaltyInfo.tier.loanInterestBonus
    );

    const id = navigation.getParam("id");
    const reason = navigation.getParam("reason");
    const activeCards = this.getActiveCards();
    const cel = walletSummary.coins.find(c => c.short === "CEL");
    const payment = loanPaymentUtil.calculateAdditionalPayment(
      loan,
      COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD,
      cel
    );
    const pay =
      reason !== LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT ? `pay` : `prepay`;

    const cardProps = [
      {
        textButton: `${formatter.capitalize(pay)} with CEL`,
        explanation: `Pay up to ${celDiscount} less interest when you choose to ${pay} your monthly payment in CEL.`,
        onPress: () => this.resolve(reason, id, payment, cel, loan),
        lightImage: require("../../../../assets/images/icons/cel.png"),
        darkImage: require("../../.././../assets/images/icons/cel-dark.png"),
        unicornImage: require("../../.././../assets/images/icons/cel-unicorn.png"),
        label: activeCards.cel ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with crypto`,
        explanation: `Use coins from your wallet to ${pay} your loan interest.`,
        onPress: () =>
          actions.navigateTo(SCREENS.LOAN_PAYMENT_COIN, { reason, id }),
        lightImage: require("../../../../assets/images/icons/crypto.png"),
        darkImage: require("../../.././../assets/images/icons/crypto-dark.png"),
        unicornImage: require("../../.././../assets/images/icons/crypto-unicorn.png"),
        label: activeCards.coin ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with Dollars`,
        explanation: `Get all the information necessary to ${pay} your interest in dollars.`,
        onPress: () => {
          if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
            actions.updateFormField("coin", "USD");
          }
          actions.openModal(MODALS.DOLLAR_PAYMENT_MODAL);
        },
        lightImage: require("../../../../assets/images/icons/dollars.png"),
        darkImage: require("../../../../assets/images/icons/dollars-dark.png"),
        unicornImage: require("../../../../assets/images/icons/dollars-unicorn.png"),
        label: activeCards.usd ? "Currently active" : null,
      },
    ];

    return cardProps;
  };

  handleSwitchChange = async () => {
    const { navigation, actions } = this.props;
    const { isAutomaticInterestPaymentEnabled } = this.state;
    const id = navigation.getParam("id");

    this.setState({
      loading: true,
    });

    await actions.updateLoanSettings(id, {
      automatic_interest_payment: !isAutomaticInterestPaymentEnabled,
    });

    this.setState({
      loading: false,
    });

    const msg = !isAutomaticInterestPaymentEnabled
      ? `Automatic Interest Payments Enabled.`
      : `Manual Interest Payments Enabled.`;
    actions.showMessage("success", msg);
  };

  automaticSwitch = () => {
    const { isAutomaticInterestPaymentEnabled } = this.state;
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChange}
        value={isAutomaticInterestPaymentEnabled}
      />
    );
  };

  closeModal = () => {
    const { actions } = this.props;

    actions.closeModal();
    actions.navigateTo(SCREENS.WIRING_BANK_INFORMATION);
  };

  render() {
    const { actions, loanSettings } = this.props;
    const { loading } = this.state;
    if (!loanSettings) return <LoadingScreen />;
    const Automatic = this.automaticSwitch;
    const style = ChoosePaymentMethodStyle();

    const cardProps = this.getCardProps();

    if (!cardProps) return <Spinner />;

    return (
      <View style={style.container}>
        <RegularLayout>
          {cardProps.map(i => (
            <MultiInfoCardButton {...i} key={i.cardTitle} />
          ))}
          <Separator margin={"20 0 20 0"} />
          <IconButton
            right={loading ? <Spinner size={30} /> : <Automatic />}
            hideIconRight
            margin="0 0 20 0"
          >
            Automatic Interest Payment
          </IconButton>
        </RegularLayout>
        <PrepayDollarInterestModal
          onPressConfirm={() =>
            actions.navigateTo(SCREENS.LOAN_PREPAYMENT_PERIOD, {
              type: "dollar",
            })
          }
        />
        <DollarPaymentModal close={() => this.closeModal()} />
      </View>
    );
  }
}

export default ChoosePaymentMethod;
