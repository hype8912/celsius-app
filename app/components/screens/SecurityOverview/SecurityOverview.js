import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import CelButton from "../../atoms/CelButton/CelButton";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecurityOverview extends Component {
  static propTypes = {
    iconName: PropTypes.string,
  };
  static defaultProps = {
    iconName: "",
  };

  static navigationOptions = () => ({
    title: "Security Overview",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  render() {
    const { securityOverview } = this.props;
    // const style = SecurityOverviewStyle();

    if (!securityOverview) return <Loader />;
    // TODO Add on press functions on WHITELISTED WITHDRAWAL ADDRESSES card and buttons
    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <Separator text="2FA VERIFICATION i" />
          <ToggleInfoCard
            mode={"toggle"}
            subtitle={"Your 2FA verification is"}
          />

          <Separator text="WHITELISTED WITHDRAWAL ADDRESSES i" />
          <ToggleInfoCard
            mode={"info"}
            status={"info"}
            subtitle={"Your Auto Logout is"}
            onPress={() => {}}
          />

          <Separator text="HODL MODE i" />
          <ToggleInfoCard mode={"toggle"} subtitle={"HODL mode is"} />

          <Separator text="PASSWORD" />
          <CelButton margin="10 0 10 0" onPress={() => {}}>
            Enhance Password
          </CelButton>

          <Separator text="PIN" />
          <CelButton margin="10 0 10 0" onPress={() => {}}>
            Enhance PIN
          </CelButton>

          <Separator text="3D PROTECTION i" />
          <ToggleInfoCard
            mode={"info"}
            status={"enabled"}
            subtitle={"Your 3D Protection is"}
          />

          <Separator text="AUTO LOGOUT i" />
          <ToggleInfoCard
            mode={"info"}
            status={"enabled"}
            subtitle={"Your Auto Logout is"}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
