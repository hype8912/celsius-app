import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import BlockExplorerCodeStyle from "./BlockExplorerCode.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import blockExplorerService from "../../../services/blockexplorer-service"

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BlockExplorerCode extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Blockexplorer code",
    right: "profile",
  });

  async componentDidMount() {
    const { actions, user } = this.props;
    const res = await blockExplorerService.getUserSettings(user.id)

    const blockExplorerCode = res.data.user_settings.address
    actions.updateFormField("BlockExplorerCode", blockExplorerCode);
  }

  renderCodeCard = () => {
    const { actions, formData } = this.props;
    return (
      <Card padding={"0 15 0 15"} color={STYLES.COLORS.WHITE}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ flex: 0.8 }}>
            <CelText weight={"500"} type={"H5"} align={"left"}>
              Your blockexplorer code
            </CelText>
          </View>
          <View style={{ flex: 0.2 }}>
            <CelText
              weight={"500"}
              align={"right"}
              type={"H6"}
              color={STYLES.COLORS.CELSIUS_BLUE}
              onPress={() => actions.navigateTo("BlockExplorerCodeChange")}
            >
              Change
            </CelText>
          </View>
        </View>

        <CelText align={"left"} type={"H6"} margin={"10 0 10 0"}>
          {formData.BlockExplorerCode}
        </CelText>

        <Separator />

        <View style={{ margin: 10 }}>
          <CopyButton
            copyText={formData.BlockExplorerCode}
            onCopy={() =>
              actions.showMessage(
                "success",
                "The secret code copied to clipboard."
              )
            }
          />
        </View>
      </Card>
    );
  };

  renderInfoBox = () => {
    const style = BlockExplorerCodeStyle();
    const infoBoxText =
      "With this unique code you can access to your secret blockexplorer page where you can track all your transactions on blockchain";

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
    // Open web browser
    // const { actions } = this.props
    return (
      <View style={{ alignItems: "center" }}>
        <CelButton
          basic
          margin={"10 0 2 0"}
          // onPress={() => console.log("Identities List")}
        >
          View Past Identities
        </CelButton>
        <CelButton
          // onPress={() => console.log('Secret Page')}
          style={{ alignSelf: "flex-start" }}
          margin="10 0 2 0"
        >
          Visit your secret page
        </CelButton>
      </View>
    );
  };

  render() {
    return (
      <RegularLayout>
        {this.renderInfoBox()}
        {this.renderCodeCard()}
        {this.renderButton()}
      </RegularLayout>
    );
  }
}

export default BlockExplorerCode;
