import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import ApiAuthorizationStyle from "./ApiAuthorization.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import CelApiDropdown from "../../molecules/CelApiDropdown/CelApiDropdown";
import ApiKeyRevokeModal from "../../modals/ApiKeyRevokeModal/ApiKeyRevokeModal";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    apiKeys: state.apiKeys.keys,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ApiAuthorization extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "API Authorization",
  });

  constructor(props) {
    super(props);
    this.state = {
      openedApiDropdown: {},
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getAllAPIKeys();
  }

  closeModal = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    // const style = ApiAuthorizationStyle();
    const { apiKeys, actions } = this.props;
    const { openedApiDropdown } = this.state;

    return (
      <RegularLayout>
        <CelText type={"H4"} weight={"400"}>
          Generate a secure API key that enables external services to read some
          of the Celsius data.{" "}
        </CelText>

        <CelButton
          onPress={() =>
            actions.navigateTo(SCREENS.API_AUTHORIZATION_PERMISSIONS)
          }
          margin={"30 0 0 0"}
        >
          Generate API key
        </CelButton>

        {!!apiKeys && apiKeys.length > 0 && <Separator margin={"24 0 24 0"} />}

        {!!apiKeys &&
          apiKeys.map(apiKey => (
            <CelApiDropdown
              apiKey={apiKey}
              key={apiKey.id}
              onOpen={() => {
                this.setState({ openedApiDropdown: apiKey });
              }}
            >
              {apiKey.lastFourCharacters}
            </CelApiDropdown>
          ))}

        <ApiKeyRevokeModal apiKey={openedApiDropdown} />
      </RegularLayout>
    );
  }
}

export default ApiAuthorization;
