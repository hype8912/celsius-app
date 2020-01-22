import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { TWLoginButton } from "react-native-simple-twitter";

import SocialLoginStyle from "./SocialLogin.styles";
import Icon from "../../atoms/Icon/Icon";
import loggerUtil from "../../../utils/logger-util";

class SocialLogin extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["login", "register"]),
    actions: PropTypes.instanceOf(Object).isRequired,
  };
  static defaultProps = {
    type: "login",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onTwitterSuccess = twitterUser => {
    const { type, actions } = this.props;

    actions.authTwitter(type, twitterUser);
  };

  onOpenTwitter = () => {
    const { actions } = this.props;

    actions.twitterOpen();
  };

  handleError = err => {
    loggerUtil.log(err);
  };

  render() {
    const { actions, type } = this.props;
    const style = SocialLoginStyle();
    return (
      <View style={style.container}>
        <View style={style.wrapper}>
          <TouchableOpacity onPress={() => actions.authFacebook(type)}>
            <Icon name="Facebook" height="35" width="35" fill="#bdc1c3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => actions.authGoogle(type)}>
            <Icon name="Google" height="35" width="35" fill="#bdc1c3" />
          </TouchableOpacity>

          <TWLoginButton
            type="TouchableOpacity"
            onGetAccessToken={actions.twitterGetAccessToken}
            onSuccess={this.onTwitterSuccess}
            closeText="< Back to Celsius"
            onClose={actions.twitterClose}
            onError={this.handleError}
            onPress={this.onOpenTwitter}
          >
            <Icon name="Twitter" height="35" width="35" fill="#bdc1c3" />
          </TWLoginButton>
        </View>
      </View>
    );
  }
}

export default SocialLogin;
