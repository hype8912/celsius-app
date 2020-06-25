import React, { Component } from "react";
import { Platform, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ChoosePaymentMethodStyle from "./ChoosePaymentMethod.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PrepayDollarInterestModal from "../../modals/PrepayDollarInterestModal/PrepayDollarInterestModal";
import { LOAN_PAYMENT_REASONS, THEMES } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import IconButton from "../../organisms/IconButton/IconButton";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";
import Separator from "../../atoms/Separator/Separator";
import Spinner from "../../atoms/Spinner/Spinner";

@connect(
  state => ({
    formData: state.forms.formData,
    loanSettings: state.loans.loanSettings,
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChoosePaymentMethod extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isAutomaticInterestPaymentEnabled: undefined,
      loading: false,
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

  getCardProps = () => {
    const { actions, navigation, loyaltyInfo } = this.props;
    const celDiscount = formatter.percentageDisplay(
      loyaltyInfo.tier.loanInterestBonus
    );
    const id = navigation.getParam("id");
    const reason = navigation.getParam("reason");
    const activeCards = this.getActiveCards();

    const pay =
      reason !== LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT ? `pay` : `prepay`;

    const cardProps = [
      {
        textButton: `${formatter.capitalize(pay)} with CEL`,
        explanation: `Pay up to ${celDiscount} less interest when you choose to ${pay} your monthly payment in CEL.`,
        onPress: () => actions.navigateTo("PaymentCel", { reason, id }),
        lightImage: require("../../../../assets/images/icons/cel.png"),
        darkImage: require("../../.././../assets/images/icons/cel-dark.png"),
        label: activeCards.cel ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with crypto`,
        explanation: `Use coins from your wallet to ${pay} your loan interest.`,
        onPress: () => actions.navigateTo("LoanPaymentCoin", { reason, id }),
        lightImage: require("../../../../assets/images/icons/crypto.png"),
        darkImage: require("../../.././../assets/images/icons/crypto-dark.png"),
        label: activeCards.coin ? "Currently active" : null,
      },
      {
        textButton: `${formatter.capitalize(pay)} with Dollars`,
        explanation: `Get all the information necessary to ${pay} your interest in dollars.`,
        onPress: () => {
          if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
            actions.updateFormField("coin", "USD");
            actions.navigateTo("LoanPrepaymentPeriod", { id, reason });
          } else {
            actions.navigateTo("WiringBankInformation", { id, reason });
          }
        },
        lightImage: require("../../../../assets/images/icons/dollars.png"),
        darkImage: require("../../../../assets/images/icons/dollars-dark.png"),
        label: activeCards.usd ? "Currently active" : null,
      },
    ];

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      cardProps.pop();
    }

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

    const isIos = Platform.OS === "ios";
    const falseColor = isIos ? "transparent" : STYLES.COLORS.DARK_GRAY3;
    const theme = getTheme();
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChange}
        value={isAutomaticInterestPaymentEnabled}
        iosBackgroundColor={
          theme === THEMES.LIGHT
            ? STYLES.COLORS.DARK_GRAY3
            : STYLES.COLORS.DARK_TOGGLE_BACKGROUND
        }
        thumbColor={
          theme === THEMES.LIGHT
            ? STYLES.COLORS.WHITE
            : STYLES.COLORS.DARK_TOGGLE_FOREGROUND
        }
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
      />
    );
  };

  render() {
    const { actions, loanSettings } = this.props;
    const { loading } = this.state;
    if (!loanSettings) return <LoadingScreen />;
    const Automatic = this.automaticSwitch;

    const style = ChoosePaymentMethodStyle();

    const cardProps = this.getCardProps();

    return (
      <View style={style.container}>
        <RegularLayout>
          {cardProps.map(i => (
            <MultiInfoCardButton {...i} key={i.cardTitle} />
          ))}
          <Separator margin={"20 0 20 0"} />
          <IconButton
            padding={"5 10 5 5"}
            right={loading ? <Spinner size={30} /> : <Automatic />}
            hideIconRight
            margin="0 0 20 0"
          >
            Automatic Interest Payment
          </IconButton>
        </RegularLayout>
        <PrepayDollarInterestModal
          onPressConfirm={() =>
            actions.navigateTo("LoanPrepaymentPeriod", { type: "dollar" })
          }
        />
      </View>
    );
  }
}

export default ChoosePaymentMethod;
