import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
// import Constants from 'expo-constants';
import {
  Image as RNImage,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import { MODALS, THEMES } from "../../../constants/UI";
import ReferralSendModal from "../../organisms/ReferralSendModal/ReferralSendModal";
import RegisterPromoCodeModal from "../../organisms/RegisterPromoCodeModal/RegisterPromoCodeModal";
import CelButton from "../../atoms/CelButton/CelButton";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import appUtil from "../../../utils/app-util";
import { KYC_STATUSES } from "../../../constants/DATA";
import KYCandPromotionsTrigger from "../../molecules/KYCandPromotionsTrigger/KYCandPromotionsTrigger";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import { hasPassedKYC } from "../../../utils/user-util";
import ProfileStyle from "./Profile.styles";
import Icon from "../../atoms/Icon/Icon";
import { getTheme } from "../../../utils/styles-util";
import Constants from "../../../../constants";

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Profile extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    right: "logout",
    title: "Your profile",
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false,
      revisionId: "",
    };
  }

  async componentDidMount() {
    const { user, actions } = this.props;
    actions.profileTaxpayerInfo();
    actions.getUserAppSettings();
    this.initForm(user);

    const appVersion = await appUtil.getRevisionId();
    this.setState({ revisionId: appVersion.revisionId });
  }

  componentDidUpdate(prevProps) {
    const { user, actions } = this.props;
    if (prevProps.user.cellphone_verified !== user.cellphone_verified) {
      actions.updateFormFields({
        cellphone: user.cellphone,
      });
    }
  }

  initForm = user => {
    const { actions } = this.props;
    if (user) {
      actions.updateFormFields({
        ssn: user.ssn,
        cellphone_verified: user.cellphone_verified,
      });
    }
  };

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutUser();
  };

  openReferralSendModal = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.REFERRAL_SEND_MODAL);
  };

  render() {
    const { profilePicture, user, actions, kycStatus } = this.props;
    const { revisionId } = this.state;
    const style = ProfileStyle();
    const theme = getTheme();
    const { ENV } = Constants;

    return (
      <RegularLayout>
        <KYCandPromotionsTrigger actions={actions} kycType={kycStatus} />
        <MissingInfoCard user={user} navigateTo={actions.navigateTo} />

        <View>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            {profilePicture ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: STYLES.COLORS.WHITE,
                }}
                uri={profilePicture}
                resizeMethod="resize"
              />
            ) : (
              <RNImage
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: STYLES.COLORS.WHITE,
                }}
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                resizeMethod="resize"
              />
            )}
            <View style={{ marginLeft: 20 }}>
              <CelText weight="600" type="H2">
                {user.first_name}
              </CelText>
              <CelText weight="600" type="H2">
                {user.last_name}
              </CelText>
              <TouchableOpacity
                onPress={() => actions.navigateTo("ChangeAvatar")}
              >
                <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">
                  Change photo
                </CelText>
              </TouchableOpacity>
            </View>
          </View>

          <IconButton
            onPress={this.openReferralSendModal}
            icon="Refer"
            color="blue"
          >
            Refer your friends
          </IconButton>
          <IconButton
            onPress={() => actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
            margin="0 0 20 0"
            icon="Present"
          >
            Enter a promo code
          </IconButton>

          <Separator />

          <IconButton
            icon={"Couple"}
            onPress={() => actions.navigateTo("PersonalInformation")}
          >
            Personal Information
          </IconButton>

          <ExpandableItem heading={"SETTINGS"} isExpanded margin={"0 0 10 0"}>
            <IconButton
              onPress={() => actions.navigateTo("SecuritySettings")}
              margin="20 0 20 0"
              icon="Security"
            >
              Security
            </IconButton>
            {hasPassedKYC() && (
              <IconButton
                onPress={() => actions.navigateTo("WalletSettings")}
                margin="0 0 20 0"
                icon="WalletSettings"
              >
                Wallet
              </IconButton>
            )}
            {hasPassedKYC() && (
              <IconButton
                onPress={() => actions.navigateTo("ApiAuthorization")}
                margin="0 0 20 0"
                icon="Api"
              >
                API
              </IconButton>
            )}
            <IconButton
              onPress={() => actions.navigateTo("Appearance")}
              margin="0 0 20 0"
              icon="Appearance"
            >
              Appearance
            </IconButton>
          </ExpandableItem>
          <Separator margin={"0 0 20 0"} text={"FOLLOW US"} />

          <View style={style.socialIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://twitter.com/CelsiusNetwork")
              }
            >
              <Icon
                name={"Twitter"}
                width={35}
                height={35}
                fill={
                  theme === THEMES.LIGHT
                    ? STYLES.COLORS.DARK_GRAY3
                    : STYLES.COLORS.WHITE_OPACITY5
                }
              />
              <CelText type={"H6"} margin={"5 0 0 0"}>
                Twitter
              </CelText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.facebook.com/CelsiusNetwork/")
              }
            >
              <Icon
                name={"Facebook"}
                width={35}
                height={35}
                fill={
                  theme === THEMES.LIGHT
                    ? STYLES.COLORS.DARK_GRAY3
                    : STYLES.COLORS.WHITE_OPACITY5
                }
              />
              <CelText type={"H6"} margin={"5 0 0 0"}>
                Facebook
              </CelText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.reddit.com/r/CelsiusNetwork/")
              }
            >
              <Icon
                name={"Reddit"}
                width={35}
                height={35}
                fill={
                  theme === THEMES.LIGHT
                    ? STYLES.COLORS.DARK_GRAY3
                    : STYLES.COLORS.WHITE_OPACITY5
                }
              />
              <CelText type={"H6"} margin={"5 0 0 0"}>
                Reddit
              </CelText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://t.me/celsiusnetwork")}
            >
              <Icon
                name={"Telegram"}
                width={35}
                height={35}
                fill={
                  theme === THEMES.LIGHT
                    ? STYLES.COLORS.DARK_GRAY3
                    : STYLES.COLORS.WHITE_OPACITY5
                }
              />
              <CelText type={"H6"} margin={"5 0 0 0"}>
                Telegram
              </CelText>
            </TouchableOpacity>
          </View>
          <Separator margin={"20 0 0 0"} />

          <View style={style.bottomSegment}>
            <CelButton
              textSize="H6"
              basic
              onPress={() => {
                actions.navigateTo("TermsOfUse");
              }}
              textColor={STYLES.COLORS.CELSIUS_BLUE}
            >
              See Terms of Use
            </CelButton>
            <CelText weight="light" align="center" type="H7">
              {`App Version: ${revisionId}`}
            </CelText>
          </View>

          {ENV === "STAGING" ? (
            <CelButton
              margin="10 0 0 0"
              basic
              onPress={() => actions.navigateTo("Storybook")}
            >
              Open Storybook
            </CelButton>
          ) : null}
        </View>

        <ReferralSendModal />
        <RegisterPromoCodeModal type={"celsius"} />
      </RegularLayout>
    );
  }
}

export default Profile;
