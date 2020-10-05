import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import { MODALS } from "../../../constants/UI";
import ReferralSendModal from "../../modals/ReferralSendModal/ReferralSendModal";
import RegisterPromoCodeModal from "../../modals/RegisterPromoCodeModal/RegisterPromoCodeModal";
import CelButton from "../../atoms/CelButton/CelButton";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import { KYC_STATUSES } from "../../../constants/DATA";
import KYCTrigger from "../../molecules/KYCTrigger/KYCTrigger";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import ProfileStyle from "./Profile.styles";
import Icon from "../../atoms/Icon/Icon";
import Constants from "../../../../constants";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { COLOR_KEYS } from "../../../constants/COLORS";
import BuildVersion from "../../molecules/BuildVersion/BuildVersion";
import { SCREENS } from "../../../constants/SCREENS";
import {
  ALL_PERMISSIONS,
  requestForPermission,
} from "../../../utils/device-permissions";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Profile extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    right: "logout",
    title: "Your profile",
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false,
    };
  }

  async componentDidMount() {
    const { user, actions } = this.props;
    actions.profileTaxpayerInfo();
    actions.getUserAppSettings();
    this.initForm(user);
  }

  componentDidUpdate(prevProps) {
    const { user, actions } = this.props;
    if (prevProps.user.cellphone_verified !== user.cellphone_verified) {
      actions.updateFormFields({
        cellphone: user.cellphone,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, profileImage } = this.props;

    // set image after camera
    if (nextProps.profileImage !== profileImage) {
      this.setState({ activeImage: nextProps.profileImage });
    }

    if (
      lastCompletedCall !== nextProps.lastCompletedCall &&
      nextProps.lastCompletedCall === API.UPLOAD_PLOFILE_IMAGE
    ) {
      actions.navigateTo(SCREENS.PROFILE);
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

  sendCsvRequest = async () => {
    const { actions } = this.props;
    await actions.sendCsvEmail();
  };

  saveCameraPhoto = photo => {
    const { actions } = this.props;

    actions.updateProfilePicture(photo);
    actions.navigateTo(SCREENS.PROFILE);
  };

  goToCamera = async () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: "profileImage",
      cameraHeading: "Profile photo",
      cameraCopy:
        "Please center your face in the circle and take a selfie, to use as your profile photo.",
      cameraType: "front",
      mask: "circle",
    });

    await requestForPermission(ALL_PERMISSIONS.CAMERA);
    await requestForPermission(ALL_PERMISSIONS.LIBRARY);
    actions.navigateTo(SCREENS.CAMERA_SCREEN, { onSave: this.saveCameraPhoto });
  };

  render() {
    const {
      profilePicture,
      user,
      actions,
      kycStatus,
      callsInProgress,
    } = this.props;
    const style = ProfileStyle();
    const { ENV } = Constants;

    const disabled = apiUtil.areCallsInProgress(
      [API.GET_CSV_EMAIL],
      callsInProgress
    );

    return (
      <RegularLayout>
        <KYCTrigger actions={actions} kycType={kycStatus} />
        <MissingInfoCard user={user} navigateTo={actions.navigateTo} />

        <View>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            {profilePicture ? (
              <Image
                style={style.avatar}
                hideFromRecording
                source={{
                  uri: profilePicture,
                  cache: "default",
                }}
                resizeMethod="resize"
              />
            ) : (
              <View style={style.emptyAvatarWrapper}>
                <ThemedImage
                  style={style.emptyAvatar}
                  lightSource={require("../../../../assets/images/avatar-empty/avatar-empty-light.png")}
                  darkSource={require("../../../../assets/images/avatar-empty/avatar-empty-dark.png")}
                  unicornSource={require("../../../../assets/images/avatar-empty/avatar-empty-new.png")}
                  resizeMethod="resize"
                />
              </View>
            )}
            <View style={{ marginLeft: 20 }}>
              <CelText hideFromRecording weight="600" type="H2">
                {user.first_name}
              </CelText>
              <CelText hideFromRecording weight="600" type="H2">
                {user.last_name}
              </CelText>
              <TouchableOpacity onPress={this.goToCamera}>
                <CelText link margin="10 0 0 0">
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
            onPress={() => actions.navigateTo(SCREENS.PERSONAL_INFORMATION)}
          >
            Personal Information
          </IconButton>

          <ExpandableItem heading={"SETTINGS"} isExpanded margin={"0 0 10 0"}>
            <IconButton
              onPress={() => actions.navigateTo(SCREENS.SECURITY_SETTINGS)}
              margin="20 0 20 0"
              icon="Security"
            >
              Security
            </IconButton>
            {hasPassedKYC() && (
              <IconButton
                onPress={() => actions.navigateTo(SCREENS.WALLET_SETTINGS)}
                margin="0 0 20 0"
                icon="WalletSettings"
              >
                Wallet
              </IconButton>
            )}
            {hasPassedKYC() && (
              <IconButton
                onPress={() => actions.navigateTo(SCREENS.API_AUTHORIZATION)}
                margin="0 0 20 0"
                icon="Api"
              >
                API
              </IconButton>
            )}
            <IconButton
              onPress={() => actions.navigateTo(SCREENS.APPEARANCE)}
              margin="0 0 20 0"
              icon="Appearance"
            >
              Appearance
            </IconButton>
          </ExpandableItem>

          <ExpandableItem heading={"REPORTS"} isExpanded margin={"0 0 10 0"}>
            <CelText margin={"0 0 20 0"}>
              Receive your total transaction history report via email.
            </CelText>

            <IconButton
              onPress={() => this.sendCsvRequest()}
              margin="0 0 20 0"
              icon="Mail"
              color={"blue"}
              hideIconRight
              disabled={disabled}
            >
              Download transaction history
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
                fill={COLOR_KEYS.PARAGRAPH}
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
                fill={COLOR_KEYS.PARAGRAPH}
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
                fill={COLOR_KEYS.PARAGRAPH}
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
                fill={COLOR_KEYS.PARAGRAPH}
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
                Linking.openURL("https://celsius.network/terms-of-use/");
              }}
            >
              See Terms of Use
            </CelButton>
            <BuildVersion />
          </View>

          {ENV === "STAGING" ? (
            <CelButton
              margin="10 0 0 0"
              basic
              onPress={() => actions.navigateTo(SCREENS.STORYBOOK)}
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
