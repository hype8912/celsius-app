import React, { Component } from "react";
import { Linking, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
// import BlockExplorerCodeStyle from "./BlockExplorerCode.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import blockExplorerService from "../../../services/blockexplorer-service"
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import IconButton from "../../organisms/IconButton/IconButton";

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
    title: "Celsius DID",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {
      didDisabled: false
    }
  }

  async componentDidMount() {
    const { actions, user } = this.props;
    try {
      const res = await blockExplorerService.getUserSettings(user.id)
      console.log('getUserSettings: ', res.data)
      const enabled = res.data.user_settings.enabled
      if (enabled) {
        this.setState({didDisabled: false})
        const blockExplorerCode = res.data.user_settings.address
        actions.updateFormField("BlockExplorerCode", blockExplorerCode);
      } else {
        this.setState({didDisabled: true})
      }
    } catch (e) {
      actions.showMessage('error', e)
    }
  }

  handleDIDswitch = async() => {
    const { user, actions } = this.props
    this.setState({ didDisabled: !this.state.didDisabled })
    try {
      if (this.state.didDisabled) {
        const res = await blockExplorerService.enableTracking(user.id)
        console.log('enableTracking: ', res.data)
        const blockExplorerCode = res.data.address
        actions.updateFormField("BlockExplorerCode", blockExplorerCode);

      } else {
        const res = await blockExplorerService.disableTracking(user.id)
        console.log('disableTracking: ', res.data)

        actions.updateFormField("BlockExplorerCode", '');
      }
    } catch (e) {
      actions.showMessage('error', e)
    }
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


  renderSwitch = () => {
    const { didDisabled } = this.state;
    return (
      <CelSwitch
        onValueChange={this.handleDIDswitch}
        value={didDisabled}
      />
    );
  };

  renderSwitchCard = () => {
    return (
        <IconButton margin={"20 0 20 0"} right={this.renderSwitch()} hideIconRight>
          Disable Celsius DID
        </IconButton>
      )
  }

  renderButton = () => {
    const { formData }  = this.props
    // Open web browser
    const link = `http://hackathon.celsius.network/user-secret-page/${formData.BlockExplorerCode}`
    const { actions } = this.props
    return (
      <View style={{ alignItems: "center" }}>
        <CelButton
          basic
          margin={"10 0 2 0"}
          onPress={() => actions.navigateTo('PastIdentities')}
        >
          View Past Identities
        </CelButton>
        <CelButton
          onPress={() => Linking.openURL(link)}
          style={{ alignSelf: "flex-start" }}
          margin="10 0 2 0"
        >
          Visit your secret page
        </CelButton>
      </View>
    );
  };

  render() {
    const { didDisabled }  = this.state
    const DIDDescription = 'With your Celsius DID (Decentralized Identity) you can access your secret blockexplorer page where you can track all your transactions. Also, you can share your Celsius DID with others to prove your transactions. By disabling your Celsius DID, your identity will be hidden on blockexplorer.'
    return (
      <RegularLayout>
        <CelText
          weight={"700"}
          type={"H3"}
          margin={'0 0 10 0'}
        >
          What is Celsius DID?</CelText>
        <CelText
          margin={'0 0 10 0'}
        >
          {DIDDescription}
        </CelText>
        {this.renderSwitchCard()}
        {!didDisabled && this.renderCodeCard()}
        {!didDisabled && this.renderButton()}
      </RegularLayout>
    );
  }
}

export default BlockExplorerCode;
