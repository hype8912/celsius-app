import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
// import ApiKeyRevokeModalStyle from "./ApiKeyRevokeModal.styles";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import CelButton from '../../atoms/CelButton/CelButton';
import { MODALS } from "../../../constants/UI";

import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    apiKeys: state.apiKeys.keys
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ApiKeyRevokeModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  shouldComponentUpdate(nextProps) {
    return nextProps.apiKey.id !== this.props.apiKey.id
  }
  
  

  render() {
    const { actions, apiKey } = this.props;
    // const style = ApiKeyRevokeModalStyle();

    return (
      <CelModal
        name={MODALS.API_KEY_REVOKE_MODAL}
      >
        <View>
          <CelText margin={"0 0 10 0"} align={"center"} weight='bold' type={"H2"}>Are you sure you want to revoke your API key?</CelText>
          <CelButton
            margin={"20 0 20 0"}
            onPress={() => {
              actions.closeModal()
              actions.revokeAPIKey(apiKey.id)
            }}
          >
            Revoke
        </CelButton>
          <TouchableOpacity onPress={() => actions.closeModal()}>
            <CelText align='center' color={STYLES.COLORS.CELSIUS_BLUE} > Cancel </CelText>
          </TouchableOpacity>
        </View>
      </CelModal>
    );
  }
}

export default ApiKeyRevokeModal
