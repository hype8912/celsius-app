import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// TODO(sb): RN update dependencies fixes
import { View, ScrollView } from "react-native";
import Contacts from "react-native-contacts";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import {
  requestForPermission,
  hasPermission,
  ALL_PERMISSIONS,
} from "../../../utils/device-permissions";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Spinner from "../../atoms/Spinner/Spinner";
import ContactList from "../../molecules/ContactList/ContactList";
import Separator from "../../atoms/Separator/Separator";
import { getFilteredContacts } from "../../../redux/custom-selectors";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";
import { KYC_STATUSES } from "../../../constants/DATA";
import logger from "../../../utils/logger-util";
import cryptoUtil from "../../../utils/crypto-util";
import { hasPassedKYC } from "../../../utils/user-util";
import ContactsLoader from "../../organisms/ContactsLoader/ContactsLoader";
import IconButton from "../../organisms/IconButton/IconButton";

const renderEmptyState = ({ onContactImport, onSkip }) => (
  <ScrollView style={{ paddingBottom: 90, paddingTop: 30 }}>
    <View style={{ flex: 1, alignItems: "center" }}>
      <CelText weight="700" type="H2" align="center" margin={"80 0 30 0"}>
        CelPay Your Way!
      </CelText>
      <CelText
        weight="300"
        margin="0 0 10 0"
        style={{ paddingHorizontal: 20 }}
        color={STYLES.COLORS.MEDIUM_GRAY}
        type="H4"
        align="center"
      >
        Import your contacts to transfer crypto quickly and easily between
        friends.
      </CelText>
      <CelText
        weight="300"
        margin="0 0 40 0"
        style={{ paddingHorizontal: 20 }}
        color={STYLES.COLORS.MEDIUM_GRAY}
        type="H6"
        align="center"
      >
        *Only friends with the Celsius app will appear in your contacts list.
      </CelText>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <CelButton margin="0 0 10 0" onPress={onContactImport}>
          Import contacts
        </CelButton>

        <CelButton margin={"10 0 0 0"} italic basic onPress={onSkip}>
          Skip this step
        </CelButton>
      </View>
    </View>
  </ScrollView>
);

@connect(
  state => ({
    contacts: getFilteredContacts(state),
    user: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayChooseFriend extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params && params.title ? params.title : "CelPay",
      right: params && params.right ? params.right : "",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      hasContactPermission: false,
      isLoading: true,
      isRefreshing: false,
    };

    this.subs = [];
  }

  async componentDidMount() {
    const { navigation, actions } = this.props;

    try {
      this.subs = [
        navigation.addListener("willBlur", () => {
          actions.updateFormField("search", "");
        }),
      ];

      await actions.getConnectedContacts();
      const permission = await requestForPermission(ALL_PERMISSIONS.CONTACTS);
      const hasFriends = this.hasFriends();

      navigation.setParams({
        title: permission && hasFriends ? "Choose a friend" : "Import Contacts",
        right: permission && hasFriends ? "search" : "profile",
      });

      this.setState({
        hasContactPermission: permission,
        isLoading: false,
      });
    } catch (err) {
      logger.log({ err });
      this.setState({
        isLoading: false,
      });
    }
  }

  // lifecycle methods
  async componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    // set image after camera
    if (
      nextProps.contacts &&
      nextProps.contacts.friendsWithApp &&
      nextProps.contacts.friendsWithApp.length > 0
    ) {
      const permission = await hasPermission(ALL_PERMISSIONS.CONTACTS);
      navigation.setParams({
        title: permission ? "Choose a friend" : "Import Contacts",
        right: permission ? "search" : "profile",
      });
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  getContacts = () => {
    return new Promise((resolve, reject) => {
      const data = [];
      Contacts.getAll((err, contacts) => {
        if (!err) {
          contacts.map(contact => {
            const c = {
              name: contact.displayName,
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
        const data = await this.getContacts();
        await actions.connectPhoneContacts(data);
        await actions.getConnectedContacts();
      } else {
        await requestForPermission(ALL_PERMISSIONS.CONTACTS);
      }
    } catch (err) {
      logger.log(err);
    }
  };

  refreshContacts = async () => {
    this.setState({
      isRefreshing: true,
    });
    await this.importContacts();
    this.setState({
      isRefreshing: false,
    });
  };

  handleContactImport = async () => {
    if (!hasPassedKYC()) return;
    const { navigation } = this.props;

    this.setState({
      isLoading: true,
    });

    try {
      await this.importContacts();
      const permission = await requestForPermission(ALL_PERMISSIONS.CONTACTS);

      navigation.setParams({
        title:
          permission && this.props.contacts.length > 0
            ? "Choose a friend"
            : "Import Contacts",
        right:
          permission && this.props.contacts.length > 0 ? "search" : "profile",
      });

      this.setState({
        hasContactPermission: permission,
        isLoading: false,
      });
    } catch (err) {
      logger.log(err);
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSkip = () => {
    const { actions } = this.props;
    actions.navigateTo("CelPayEnterAmount");
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

  hasFriends = () =>
    this.props.contacts &&
    this.props.contacts.friendsWithApp &&
    this.props.contacts.friendsWithApp.length > 0;

  renderContent = () => {
    const { hasContactPermission, isRefreshing } = this.state;
    const { contacts } = this.props;
    const EmptyState = renderEmptyState;

    const hasFriends = this.hasFriends();

    if (!hasContactPermission && !hasFriends) {
      return (
        <EmptyState
          onContactImport={this.handleContactImport}
          onSkip={this.handleSkip}
        />
      );
    }

    return (
      <View style={{ flex: 1, width: "100%" }}>
        <IconButton onPress={this.sendLink} margin="20 0 20 0">
          {" "}
          Send as a link
        </IconButton>
        <View style={{ width: "100%" }}>
          <Separator />
          <CelButton
            basic={!hasFriends}
            margin="15 0 15 0"
            loading={isRefreshing}
            onPress={this.refreshContacts}
          >
            Refresh contacts
          </CelButton>
        </View>

        <ContactList
          contacts={contacts}
          onContactPress={this.handleContactPress}
        />
      </View>
    );
  };

  renderLoader = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Spinner />
    </View>
  );

  render() {
    const {
      user,
      kycStatus,
      celpayCompliance,
      walletSummary,
      actions,
    } = this.props;
    const { isLoading } = this.state;
    const hasFriends = this.hasFriends();

    if (kycStatus !== KYC_STATUSES.pending && !hasPassedKYC())
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_CELPAY }}
        />
      );
    if (kycStatus === KYC_STATUSES.pending && !hasPassedKYC())
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_CELPAY }}
        />
      );
    if (!user.celsius_member)
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_MEMBER_CELPAY }}
        />
      );
    if (!celpayCompliance.allowed)
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;

    if (isLoading && !hasFriends)
      return <ContactsLoader navigateTo={actions.navigateTo} />;
    if (!cryptoUtil.isGreaterThan(walletSummary.total_amount_usd, 0))
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      );

    const RenderContent = this.renderContent;

    return (
      <RegularLayout
        enableParentScroll={false}
        padding={`0 20 ${isLoading ? "0" : "140"} 20`}
      >
        <RenderContent {...this.props} />
      </RegularLayout>
    );
  }
}

export default CelPayChooseFriend;
