import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import PropTypes from "prop-types";

import * as appActions from "../../../redux/actions";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import BlockExplorerCodeChangeStyle from "./BlockExplorerCodeChange.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import blockExplorerService from "../../../services/blockexplorer-service";
import { MODALS } from "../../../constants/UI";
import NewBlockexplorerCode from "../../modals/NewBlockexplorerCode/NewBlockexplorerCode";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BlockExplorerCodeChange extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Celsius DID",
    right: "profile",
  });

  generateNewCode = async () => {
    const { user, actions } = this.props;
    try {
      const res = await blockExplorerService.createNewIdentity(user.id);
      if (res.data.address !== "0xERROR") {
        await actions.updateFormField("BlockExplorerCode", res.data.address);
        actions.openModal(MODALS.NEW_BLOCKEXPLORER_CODE);
      }
    } catch (e) {
      actions.showMessage("error", e);
    }
  };

  closeModal = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.resetToScreen("BlockExplorerCode");
    actions.showMessage(
      "success",
      "Successfully changed your blockexplorer code"
    );
  };

  renderCodeCard = () => {
    const { formData } = this.props;
    return (
      <View>
        <CelText>Your current blockexplorer code</CelText>
        <Card padding={"0 15 0 15"} color={STYLES.COLORS.WHITE}>
          <CelText align={"left"} type={"H6"} margin={"10 0 10 0"}>
            {formData.BlockExplorerCode}
          </CelText>
        </Card>
      </View>
    );
  };

  renderInfoBox = () => {
    const style = BlockExplorerCodeChangeStyle();
    const infoBoxText =
      "For better security, we recommend you to change your unique code from time to time";

    return (
      <Card color={STYLES.COLORS.CELSIUS_BLUE}>
        <View style={style.infoBoxWrapper}>
          <View style={style.infoBoxIconWrapper}>
            <Icon
              name="Info"
              width="25"
              height="25"
              fill={STYLES.COLORS.WHITE}
            />
          </View>
          <View style={style.infoBoxTextWrapper}>
            <CelText type={"H5"} weight={"300"} color={STYLES.COLORS.WHITE}>
              {infoBoxText}
            </CelText>
          </View>
        </View>
      </Card>
    );
  };

  renderButton = () => {
    const { actions } = this.props;

    return (
      <View style={{ alignItems: "center" }}>
        <CelButton
          basic
          onPress={() => actions.navigateTo("PastIdentities")}
          margin={"10 0 2 0"}
        >
          View Past Identities
        </CelButton>
        <CelButton
          onPress={() => this.generateNewCode()}
          style={{ alignSelf: "flex-start" }}
          margin="10 0 2 0"
        >
          Generate new code
        </CelButton>
      </View>
    );
  };

  render() {
    const { formData } = this.props;

    return (
      <RegularLayout>
        {this.renderInfoBox()}
        {this.renderCodeCard()}
        {this.renderButton()}
        <NewBlockexplorerCode
          closeModal={this.closeModal}
          address={formData.BlockExplorerCode}
        />
      </RegularLayout>
    );
  }
}

export default BlockExplorerCodeChange;
