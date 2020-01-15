import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";
import Contacts from "react-native-contacts";
import reactotron from "reactotron-react-native";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import {
  requestForPermission,
  ALL_PERMISSIONS,
} from "../../../utils/device-permissions";
import CelButton from "../../atoms/CelButton/CelButton";
import ContactList from "../../molecules/ContactList/ContactList";
import logger from "../../../utils/logger-util";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    contacts: state.contacts.contacts,
    callsInProgress: state.api.callsInProgress,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayChooseFriend extends Component {
  static navigationOptions = () => ({
    title: "Choose a Celsian to CelPay",
    right: "search",
  });

  constructor(props) {
    super(props);
    this.state = {
      hasContactPermission: false,
      loadingContacts: false,
      totalContacts: 0,
      loadedContacts: 0,
    };
  }

  async componentDidMount() {
    const { actions } = this.props;

    try {
      await actions.getContacts();
      const permission = await requestForPermission(ALL_PERMISSIONS.CONTACTS);

      this.setState({
        hasContactPermission: permission,
      });
    } catch (err) {
      logger.log({ err });
    }
  }

  getDeviceContacts = () => {
    return new Promise((resolve, reject) => {
      const data = [];
      Contacts.getAll((err, contacts) => {
        if (!err) {
          contacts.map(contact => {
            const c = {
              name: `${contact.givenName} ${contact.familyName}`,
              phoneNumbers: contact.phoneNumbers,
              emails: contact.emailAddresses,
            };
            return data.push(c);
          });
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };

  importContacts = async () => {
    const { actions } = this.props;
    try {
      const permission = await requestForPermission(ALL_PERMISSIONS.CONTACTS);
      if (permission) {
        this.setState({ loadingContacts: true });
        const phoneContacts = await this.getDeviceContacts();

        let loadedContacts = 0;
        this.setState({ totalContacts: phoneContacts.length, loadedContacts });

        let position = 0;
        // Set batch size for sending to BE
        const batchSize = 150;
        const contactBatches = [];
        // Slice contacts into batches
        while (position < phoneContacts.length) {
          contactBatches.push(
            phoneContacts.slice(position, position + batchSize)
          );
          position += batchSize;
        }

        // Connect batches of contacts
        for (let i = 0; i < contactBatches.length; i++) {
          await actions.connectPhoneContacts(contactBatches[i]);
          await actions.getContacts();
          loadedContacts += contactBatches[i].length;
          this.setState({ loadedContacts });
        }

        this.setState({ loadingContacts: false });
      } else {
        await requestForPermission(ALL_PERMISSIONS.CONTACTS);
      }
    } catch (err) {
      logger.log(err);
    }
  };

  sendLink = async () => {
    const { actions } = this.props;

    actions.updateFormField("friend", undefined);
    actions.navigateTo("CelPayEnterAmount");
  };

  handleContactPress = async contact => {
    const { actions } = this.props;

    actions.updateFormField("friend", contact);
    actions.navigateTo("CelPayEnterAmount");
  };

  filterContacts = () => {
    const { contacts, formData } = this.props;
    reactotron.log({ formData });
    return formData.search
      ? contacts.filter(c =>
          c.name.toLowerCase().includes(formData.search.toLowerCase())
        )
      : contacts;
  };

  hasFriends = () => this.props.contacts && this.props.contacts.length > 0;

  renderFTUX = () => {
    return (
      <RegularLayout>
        <View>
          <CelText type="H2" align="center" margin="20 0 0 0">
            CelPay your way!
          </CelText>

          <CelButton margin="20 0 20 0" onPress={this.importContacts}>
            Import Device Contacts
          </CelButton>

          <CelButton margin="20 0 20 0" basic onPress={this.sendLink}>
            Send as link
          </CelButton>
        </View>
      </RegularLayout>
    );
  };

  renderNoFirends = () => {
    const { search } = this.props.formData;
    const text = search
      ? `No contact named ${search}`
      : "None of your contacts";
    return (
      <View>
        <CelText type="H2" align="center">
          No contacts
        </CelText>

        <CelText align="center">
          {text} has a Celsius account. You can still send them money as a link
        </CelText>

        <CelButton onPress={this.sendLink}>Send as link</CelButton>
      </View>
    );
  };

  render() {
    const {
      hasContactPermission,
      loadingContacts,
      totalContacts,
      loadedContacts,
    } = this.state;
    const { callsInProgress } = this.props;

    const hasFriends = this.hasFriends();
    if (
      !hasFriends &&
      apiUtil.areCallsInProgress([API.GET_CONNECT_CONTACTS], callsInProgress) &&
      !loadingContacts
    ) {
      return <LoadingScreen />;
    }

    if ((!hasContactPermission || !hasFriends) && !loadingContacts) {
      return this.renderFTUX();
    }

    const filteredContacts = this.filterContacts();
    reactotron.log({ filteredContacts });
    return (
      <RegularLayout>
        <View style={{ flex: 1, width: "100%" }}>
          {loadingContacts ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <ProgressBar
                steps={totalContacts}
                currentStep={loadedContacts}
                margin="10 0 10 0"
              />
              <CelText>
                {loadedContacts} of {totalContacts} contacts loaded
              </CelText>
            </View>
          ) : (
            <CelButton margin="15 0 15 0" onPress={this.importContacts} basic>
              Refresh contacts
            </CelButton>
          )}

          {filteredContacts.length ? (
            <ContactList
              contacts={filteredContacts}
              onContactPress={this.handleContactPress}
            />
          ) : (
            this.renderNoFirends()
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default CelPayChooseFriend;
