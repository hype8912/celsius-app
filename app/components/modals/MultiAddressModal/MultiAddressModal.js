import React, { Component } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MultiAddressModalStyle from "./MultiAddressModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal.js";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import multiStepUtil from "../../../utils/multistep-modal-util";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import STYLES from "../../../constants/STYLES";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";

import * as appActions from "../../../redux/actions";
import Separator from "../../atoms/Separator/Separator";
import { getTheme } from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MultiAddressModal extends Component {
  static propTypes = {
    actions: PropTypes.instanceOf(Object).isRequired,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    const { walletSummary, currenciesRates } = props;
    const coinWithAddressChangePending = [];

    walletSummary.coins
      .filter(coin => coin.has_pending_deposit_address_change === true)
      .forEach(coin => {
        coinWithAddressChangePending.push(
          currenciesRates.find(c => c.short === coin.short)
        );
      });

    this.state = {
      coinsToShow: coinWithAddressChangePending,
    };
  }

  closeModal = () => {
    const { actions, formData } = this.props;

    if (formData.modalAddresses)
      actions.setUserAppSettings({
        user_triggered_actions: {
          permanently_dismiss_deposit_address_changes: formData.modalAddresses,
        },
      });
    actions.closeModal();
  };

  render() {
    const { actions, formData } = this.props;
    const { coinsToShow } = this.state;
    const theme = getTheme();
    const style = MultiAddressModalStyle();

    return (
      <MultistepModal
        style={style.container}
        name={MODALS.MULTI_ADDRESS_MODAL}
        modalHeight={60}
        imageHeight={35}
        imageWidth={35}
        imagesArray={[
          theme === THEMES.LIGHT
            ? require("../../../../assets/images/plus-celsiusBlue.png")
            : require("../../../../assets/images/plus-white.png"),
          theme === THEMES.LIGHT
            ? require("../../../../assets/images/plus-celsiusBlue.png")
            : require("../../../../assets/images/plus-white.png"),
        ]}
      >
        <View style={style.modalWrapper}>
          <CelText
            type={"H3"}
            align={"left"}
            weight={"700"}
            margin={"0 20 5 20"}
          >
            Deposit address change
          </CelText>
          <CelText
            type={"H5"}
            align={"left"}
            margin={"0 20 10 20"}
            weight={"300"}
          >
            We’ve upgraded our service provider from BitGo to Fireblocks.
            Deposit addresses of your coins has been updated to reflect this
            change. Please make sure to use the new address when making a
            deposit.
          </CelText>
          <ScrollView style={[style.coinList, style.background]}>
            <CelText
              type={"H6"}
              align={"left"}
              margin={"0 0 10 0"}
              weight={"500"}
            >
              Your coins with new deposit address
            </CelText>
            {coinsToShow.map(c => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo("Deposit", { coin: c.short })
                  }
                  style={style.listCoin}
                >
                  {theme === THEMES.LIGHT ? (
                    <Image
                      source={{ uri: c.image_url }}
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Icon
                      name={`Icon${c.short}`}
                      fill={STYLES.COLORS.WHITE}
                      height={30}
                      width={30}
                    />
                  )}
                  <CelText weight={"400"} type={"H6"} margin={"0 10 0 5"}>
                    {c.displayName}
                  </CelText>
                  <CelText
                    weight={"400"}
                    type={"H6"}
                    margin={"0 5 0 0"}
                  >{`(${c.short})`}</CelText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={style.buttonsWrapper}>
            <CelModalButton
              onPress={() => multiStepUtil.goToNextStep()}
              buttonStyle={"basic"}
              position={"single"}
            >
              Next Info
            </CelModalButton>
          </View>
        </View>
        <View style={style.modalWrapper}>
          <CelText
            type={"H3"}
            align={"left"}
            weight={"700"}
            margin={"0 20 0 20"}
          >
            How to generate your new deposit address
          </CelText>
          <CelText style={style.text} type={"H5"} margin={"0 20 0 20"}>
            {`· Navigate to the deposit screen`}
          </CelText>
          <CelText style={style.text} type={"H5"} margin={"0 20 0 20"}>
            {`· Choose the relevant coin`}
          </CelText>
          <CelText style={style.text} type={"H5"} margin={"0 20 10 20"}>
            {`· The new deposit address will appear on the screen`}
          </CelText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: STYLES.COLORS.RED,
              marginHorizontal: 20,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <CelText align={"left"} color={STYLES.COLORS.WHITE}>
              Deposits made to your old addresses may result in a permanent loss
              of funds.
            </CelText>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <Separator />
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <CelCheckbox
              field="modalAddresses"
              updateFormField={actions.updateFormField}
              value={formData.modalAddresses}
              uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
              checkedCheckBoxColor={STYLES.COLORS.GREEN}
            />
            <CelText type={"H4"}>Don't show this again</CelText>
          </View>

          <View style={style.buttonsWrapper}>
            <CelModalButton
              onPress={() => multiStepUtil.goToPrevStep()}
              buttonStyle={"secondary"}
              position={"left"}
            >
              Previous Info
            </CelModalButton>
            <CelModalButton
              onPress={() => this.closeModal()}
              buttonStyle={"basic"}
              position={"right"}
            >
              Continue
            </CelModalButton>
          </View>
        </View>
      </MultistepModal>
    );
  }
}

export default MultiAddressModal;
