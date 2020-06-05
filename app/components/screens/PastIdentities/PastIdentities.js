import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import PastIdentitiesStyle from "./PastIdentities.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import blockExplorerService from "../../../services/blockexplorer-service";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PastIdentities extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Past Identities",
    right: "profile",
  });

  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    }
  }

  async componentDidMount() {
    const {user, actions} = this.props
    try {
      const res = await blockExplorerService.getAllIdentities(user.id)
      this.setState({
        addresses: res.data.addresses
      })
    } catch (e) {
      actions.showMessage("error", e)
    }
  }

  render() {
    const { addresses } = this.state
    if (addresses.length === 0) {
      return <LoadingScreen />;
    }
    return (
      <RegularLayout>
        {addresses.map(item => (
          <Card padding={"20 20 20 20"}>
            <CelText type={"H6"}>{item}</CelText>
          </Card>
        ))}
      </RegularLayout>
    );
  }
}

export default PastIdentities;
