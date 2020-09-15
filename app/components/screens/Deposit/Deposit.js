import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode-svg";

import cryptoUtil from "../../../utils/crypto-util/crypto-util";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import * as appActions from "../../../redux/actions";
import { getDepositEligibleCoins } from "../../../redux/custom-selectors";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import ShareButton from "../../atoms/ShareButton/ShareButton";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import DepositStyle from "./Deposit.styles";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import {
  EMPTY_STATES,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";
import Spinner from "../../atoms/Spinner/Spinner";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import { KYC_STATUSES } from "../../../constants/DATA";
import StaticScreen from "../StaticScreen/StaticScreen";
import IconButton from "../../organisms/IconButton/IconButton";
import MemoIdModal from "../../modals/MemoIdModal/MemoIdModal";
import DepositInfoModal from "../../modals/DepositInfoModal/DepositInfoModal";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import formatter from "../../../utils/formatter";
import DestinationInfoTagModal from "../../modals/DestinationInfoTagModal/DestinationInfoTagModal";
import RateInfoCard from "../../molecules/RateInfoCard/RateInfoCard";
import AdditionalAmountCard from "../../molecules/AdditionalAmountCard/AdditionalAmountCard";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    eligibleCoins: getDepositEligibleCoins(state),
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    depositCompliance: state.compliance.deposit,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    interestCompliance: state.compliance.interest,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Deposit extends Component {
  static navigationOptions = () => ({
    title: "Transfer coins",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { depositCompliance, currencies, navigation, actions } = props;

    const coinSelectItems =
      currencies &&
      currencies
        .filter(c => depositCompliance.coins.includes(c.short))
        .map(c => ({
          label: `${formatter.capitalize(c.name)} (${c.short})`,
          value: c.short,
        }));
    const currencyFromNav = navigation.getParam("coin");
    actions.updateFormField("selectedCoin", currencyFromNav || "ETH");
    this.fetchAddress(currencyFromNav || "ETH");

    this.state = {
      isFetchingAddress: false,
      coinSelectItems,
      displayAddress: null,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    setTimeout(() => {
      actions.openModal(MODALS.DEPOSIT_INFO_MODAL);
    }, 1000);
  }

  getAddress = currency => {
    const { walletAddresses } = this.props;

    let address = "";
    let alternateAddress = "";
    let secondaryAddress = "";
    let destinationTag = "";
    let memoId = "";
    let fullAddress = "";

    if (!currency) {
      return {
        address,
        alternateAddress,
        secondaryAddress,
        destinationTag,
        memoId,
      };
    }

    // If currency is ERC20 get ETH address because it's the same for all ERC20, else
    // find the address in wallet for specific currency
    // if (cryptoUtil.isERC20(currency)) {
    //   fullAddress = walletAddresses.ETHAddress
    //   alternateAddress = walletAddresses.ETHAlternateAddress
    // } else {
    //   fullAddress = walletAddresses[`${currency}Address`]
    //   alternateAddress = walletAddresses[`${currency}AlternateAddress`]
    // }
    fullAddress = walletAddresses[`${currency}Address`];
    alternateAddress = walletAddresses[`${currency}AlternateAddress`];
    secondaryAddress = walletAddresses[`${currency}SecondaryAddress`];
    // Because getAddress is called in render method, it might happen that currency is defined and
    // walletAddresses is still not defined because those 2 are fetched from different APIs
    if (!fullAddress) {
      return {
        address,
        alternateAddress,
        secondaryAddress,
        destinationTag,
        memoId,
      };
    }

    // If address has dt(destinationTag) or memoId, split it and return it separately
    if (fullAddress.includes("?dt=")) {
      const splitAddress = fullAddress.split("?dt=");
      address = splitAddress[0];
      destinationTag = splitAddress[1];
    } else if (fullAddress.includes("?memoId=")) {
      const splitAddress = fullAddress.split("?memoId=");
      address = splitAddress[0];
      memoId = splitAddress[1];
    } else {
      address = fullAddress;
    }

    return {
      address,
      alternateAddress,
      secondaryAddress,
      destinationTag,
      memoId,
    };
  };

  handleCoinSelect = async (field, item) => {
    const { actions } = this.props;
    actions.openModal(MODALS.DEPOSIT_INFO_MODAL);
    actions.updateFormField(field, item);
    await this.fetchAddress(item);
  };

  fetchAddress = async currency => {
    const { actions, walletAddresses } = this.props;
    if (!hasPassedKYC()) return;

    await this.setState({ isFetchingAddress: true });
    // Every ERC20 has the same address, so we use ETH address
    // Also check if it's already fetched and stored in redux state to avoid additional http requests
    // if (cryptoUtil.isERC20(currency) && !walletAddresses.ETHAddress) {
    //   await actions.getCoinAddress('ETH')
    // } else if (
    //   !cryptoUtil.isERC20(currency) &&
    //   !walletAddresses[`${currency}Address`]
    // ) {
    //   // If it's not ERC20 and not already fetched and stored in redux state, get the address
    //   await actions.getCoinAddress(currency)
    // }
    if (!walletAddresses[`${currency}Address`])
      await actions.getCoinAddress(currency);

    const { address } = this.getAddress(currency);

    await this.setState({ isFetchingAddress: false, displayAddress: address });
  };

  openModal = (destinationTag, memoId) => {
    const { actions } = this.props;

    if (destinationTag) {
      actions.openModal(MODALS.DESTINATION_TAG_MODAL);
    }

    if (memoId) {
      actions.openModal(MODALS.MEMO_ID_MODAL);
    }
  };

  renderPayCard = () => {
    const { navigation } = this.props;
    const coin = navigation.getParam("coin");
    const amountUsd = navigation.getParam("amountUsd");
    const additionalCryptoAmount = navigation.getParam(
      "additionalCryptoAmount"
    );
    const reason = navigation.getParam("reason");

    let text;
    let usd;
    let crypto;

    switch (reason) {
      case LOAN_PAYMENT_REASONS.MANUAL_INTEREST:
      case LOAN_PAYMENT_REASONS.INTEREST:
      case LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT:
        text = "required for the next interest payment.";
        usd = amountUsd;
        crypto = additionalCryptoAmount;
        break;
      case LOAN_PAYMENT_REASONS.PRINCIPAL:
        text = "required for the principal payment.";
        usd = amountUsd;
        crypto = additionalCryptoAmount;
        break;
      case LOAN_PAYMENT_REASONS.MARGIN_CALL:
        text = "required to close the Margin Call";
        usd = amountUsd;
        crypto = additionalCryptoAmount;
        break;
      default:
        text = "required";
        usd = 0;
        crypto = 0;
    }

    const color =
      reason !== "MARGIN_CALL"
        ? COLOR_KEYS.PRIMARY_BUTTON
        : COLOR_KEYS.NEGATIVE_STATE;

    return (
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <AdditionalAmountCard
          color={color}
          additionalUsd={usd}
          additionalCryptoAmount={crypto}
          text={text}
          coin={coin}
        />
      </View>
    );
  };

  renderLoader = () => (
    <View
      style={{
        marginBottom: 50,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </View>
  );

  render() {
    const {
      actions,
      formData,
      depositCompliance,
      navigation,
      kycStatus,
      walletSummary,
      interestCompliance,
    } = this.props;
    const { alternateAddress, destinationTag, memoId } = this.getAddress(
      formData.selectedCoin
    );
    const isMarginCall = navigation.getParam("isMarginCall");
    const reason = navigation.getParam("reason");
    const coin = formData.selectedCoin;
    const { displayAddress, isFetchingAddress, coinSelectItems } = this.state;
    const styles = DepositStyle();
    const coinInfo = walletSummary.coins.find(
      c => c.short === formData.selectedCoin
    );

    if (!hasPassedKYC()) {
      if (kycStatus === KYC_STATUSES.pending) {
        return (
          <StaticScreen
            emptyState={{
              purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_DEPOSIT,
            }}
          />
        );
      }
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_DEPOSIT }}
        />
      );
    }
    if (!depositCompliance.allowed) {
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;
    }

    return (
      <RegularLayout padding={"20 0 100 0"}>
        {isMarginCall ? this.renderPayCard() : null}
        <CelText align="center" weight="regular" type="H4">
          Choose coin to transfer
        </CelText>
        <CoinPicker
          type={"withIcon"}
          updateFormField={actions.updateFormField}
          onChange={this.handleCoinSelect}
          coin={formData.selectedCoin}
          field="selectedCoin"
          availableCoins={coinSelectItems}
          navigateTo={actions.navigateTo}
        />

        {navigation.getParam("isMarginWarning") ? this.renderPayCard() : null}

        {(isFetchingAddress || !displayAddress) && this.renderLoader()}

        {displayAddress && !isFetchingAddress ? (
          <View style={styles.container}>
            {destinationTag || memoId ? (
              <Card>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CelText>
                    {destinationTag ? "Destination Tag:" : "Memo Id"}
                  </CelText>
                  <View
                    style={{
                      paddingBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CelText style={styles.importantInfo} weight={"500"}>
                      {destinationTag || memoId}
                    </CelText>
                    <TouchableOpacity
                      onPress={() => this.openModal(destinationTag, memoId)}
                    >
                      <Icon
                        name="Info"
                        height="20"
                        width="20"
                        fill={COLOR_KEYS.HEADLINE}
                        style={{ marginLeft: 10, marginTop: 2 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.copyShareWrapper}>
                  <Separator />
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton
                      copyText={destinationTag || memoId}
                      onCopy={() =>
                        actions.showMessage(
                          "success",
                          "Destination tag copied to clipboard!"
                        )
                      }
                    />
                    <Separator vertical />
                    <ShareButton shareText={destinationTag || memoId} />
                  </View>
                </View>
              </Card>
            ) : null}

            <Card>
              <View style={styles.qrCode}>
                <View style={styles.qrCodeWrapper}>
                  <QRCode
                    value={displayAddress}
                    size={100}
                    bgColor="#FFF"
                    fgColor="#000"
                  />
                </View>
                <CelText
                  type="H4"
                  align={"center"}
                  margin="10 0 10 0"
                  style={styles.importantInfo}
                >
                  {displayAddress}
                </CelText>

                <View style={styles.copyShareWrapper}>
                  <Separator />
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton
                      onCopy={() =>
                        actions.showMessage(
                          "success",
                          "Address copied to clipboard!"
                        )
                      }
                      copyText={displayAddress}
                    />
                    <Separator vertical />
                    <ShareButton shareText={displayAddress} />
                  </View>
                </View>
              </View>
            </Card>

            {alternateAddress &&
              this.renderSwitchAddressBlock(
                alternateAddress,
                formData.selectedCoin
              )}
          </View>
        ) : null}

        {reason ? (
          <View>{!isMarginCall && this.renderPayCard()}</View>
        ) : (
          <View>
            <RateInfoCard
              style={styles.rateInfoCard}
              coin={coinInfo}
              navigateTo={actions.navigateTo}
              celInterestButton
              interestCompliance={interestCompliance}
            />
          </View>
        )}

        {cryptoUtil.buyInApp(formData.selectedCoin) && (
          <CelText
            margin={"20 0 20 0"}
            align={"center"}
            color={COLOR_KEYS.PRIMARY_BUTTON}
            type={"H4"}
            weight={"300"}
            onPress={() => actions.navigateTo("GetCoinsLanding")}
          >
            {cryptoUtil.provideText(formData.selectedCoin)}
          </CelText>
        )}

        {isFetchingAddress && this.renderLoader()}

        {isMarginCall && (
          <View style={{ marginHorizontal: 20 }}>
            <Card>
              <CelText>
                Once your deposit has been completed our system will notify you.
                Once the funds are in your wallet, sign back into the app to
                complete the Margin Call.
              </CelText>
            </Card>
          </View>
        )}

        {formData.selectedCoin === "CEL" ? (
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <IconButton
              margin="20 0 0 0"
              padding="15 18 15 18"
              onPress={() => actions.navigateTo(SCREENS.LOYALTY_PROGRAM)}
            >
              Learn about the CEL Loyalty Program
            </IconButton>
          </View>
        ) : null}
        <DestinationInfoTagModal closeModal={actions.closeModal} />
        {coinInfo && coinInfo.short && (
          <MemoIdModal closeModal={actions.closeModal} coin={coinInfo.short} />
        )}
        <DepositInfoModal type={coin} />
      </RegularLayout>
    );
  }
}

export default Deposit;
