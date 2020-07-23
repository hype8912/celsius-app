import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
// import Constants from 'expo-constants';
import {
  Image,
  Linking,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import { MODALS, THEMES } from "../../../constants/UI";
import ReferralSendModal from "../../modals/ReferralSendModal/ReferralSendModal";
import RegisterPromoCodeModal from "../../modals/RegisterPromoCodeModal/RegisterPromoCodeModal";
import CelButton from "../../atoms/CelButton/CelButton";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import appUtil from "../../../utils/app-util";
import { KYC_STATUSES } from "../../../constants/DATA";
import KYCTrigger from "../../molecules/KYCTrigger/KYCTrigger";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import { hasPassedKYC } from "../../../utils/user-util";
import ProfileStyle from "./Profile.styles";
import Icon from "../../atoms/Icon/Icon";
import { getTheme } from "../../../utils/styles-util";
import Constants from "../../../../constants";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import BottomSheet from "reanimated-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import ViewPager from "@react-native-community/viewpager";
import formatter from "../../../utils/formatter";
import Card from "../../atoms/Card/Card";
import STYLE from "../../../constants/STYLES";

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    callsInProgress: state.api.callsInProgress,
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

    const timeout = setTimeout(() => {
      this.refRBSheet.open();
    }, 2000);
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

  sendCsvRequest = async () => {
    const { actions } = this.props;
    await actions.sendCsvEmail();
  };

  renderCelPayFlow = (option, step) => {
    if (option === "link") {
      if (step === 1) {
        return <View></View>;
      }
      if (step === 2) {
        return <View></View>;
      }
      if (step === 3) {
        return <View></View>;
      }
    }
  };

  renderItem = (type, option, step) => {
    if (type === "celpay") {
      this.renderCelPayFlow(option, step);
    }
  };

  render() {
    const {
      profilePicture,
      user,
      actions,
      kycStatus,
      callsInProgress,
    } = this.props;
    const { revisionId } = this.state;
    const style = ProfileStyle();
    const theme = getTheme();
    const { ENV } = Constants;

    const disabled = apiUtil.areCallsInProgress(
      [API.GET_CSV_EMAIL],
      callsInProgress
    );

    const data = [
      { text: "prva strana" },
      {
        text: "druga strana",
        type: "celpay",
        option: "link",
        step: 2,
        onPressBack: () => console.log("onPressBack"),
        title: "Your`re about to send",
        cryptoAmount: 0.56851,
        crypto: "BTC",
        usdAmount: 4550,
        date: "23 July 2020",
        time: "11:23 AM",
        boxMessage:
          "After you confirm the transaction via email you will be able to share your CelPay link.",
        buttonText: "Share CeplPay link",
      },
      { text: "treca strana" },
    ];

    return (
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <View style={{ flex: 1 }}>
          <CelText type="H2">You’re about to send</CelText>
          <CelText type="H6" weight="200">
            {formatter.crypto(0.56851, "btc".toUpperCase(), { precision: 5 })}
          </CelText>
          <CelText> $ 4.550,00</CelText>
          <CelText> Date: 23. July 2020</CelText>
          <CelText> Time: 11:23 AM</CelText>
          <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE}>
            <CelText color={STYLE.COLORS.WHITE}>
              After you confirm the transaction via email you will be able to
              share your CelPay link.
            </CelText>
          </Card>
          <CelButton
            onPress={() => {
              console.log("ShareCel pay pressed");
            }}
          >
            Share CelPay link
          </CelButton>
        </View>
        <RBSheet
          ref={r => (this.refRBSheet = r)}
          closeOnDragDown={true}
          closeOnPressMask={true}
          openDuration={200}
          height={500}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              borderRadius: 20,
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "orange",
            },
          }}
        >
          <FlatList
            ref={fl => (this.list = fl)}
            data={data}
            pagingEnabled
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ backgroundColor: "green", height: 450, width: 400 }}
                onPress={() => this.list.scrollToIndex({ index: index + 1 })}
              >
                <Text>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    );

    // return (
    //   <RegularLayout>
    //     <KYCTrigger actions={actions} kycType={kycStatus} />
    //     <MissingInfoCard user={user} navigateTo={actions.navigateTo} />
    //     <View>
    //       <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
    //         {profilePicture ? (
    //           <Image
    //             style={{
    //               width: 100,
    //               height: 100,
    //               borderRadius: 50,
    //               borderWidth: 4,
    //               borderColor: STYLES.COLORS.WHITE,
    //             }}
    //             source={{
    //               uri: profilePicture,
    //               cache: "default",
    //             }}
    //             resizeMethod="resize"
    //           />
    //         ) : (
    //           <Image
    //             style={{
    //               width: 100,
    //               height: 100,
    //               borderRadius: 50,
    //               borderWidth: 4,
    //               borderColor: STYLES.COLORS.WHITE,
    //             }}
    //             source={require("../../../../assets/images/empty-profile/empty-profile.png")}
    //             resizeMethod="resize"
    //           />
    //         )}
    //         <View style={{ marginLeft: 20 }}>
    //           <CelText weight="600" type="H2">
    //             {user.first_name}
    //           </CelText>
    //           <CelText weight="600" type="H2">
    //             {user.last_name}
    //           </CelText>
    //           <TouchableOpacity
    //             onPress={() => actions.navigateTo("ChangeAvatar")}
    //           >
    //             <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">
    //               Change photo
    //             </CelText>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //
    //       <IconButton
    //         onPress={this.openReferralSendModal}
    //         icon="Refer"
    //         color="blue"
    //       >
    //         Refer your friends
    //       </IconButton>
    //       <IconButton
    //         // onPress={() => actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
    //         onPress={() => actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
    //         margin="0 0 20 0"
    //         icon="Present"
    //       >
    //         Enter a promo code
    //       </IconButton>
    //
    //       <Separator />
    //
    //       <IconButton
    //         icon={"Couple"}
    //         onPress={() => actions.navigateTo("PersonalInformation")}
    //       >
    //         Personal Information
    //       </IconButton>
    //
    //       <ExpandableItem heading={"SETTINGS"} isExpanded margin={"0 0 10 0"}>
    //         <IconButton
    //           onPress={() => actions.navigateTo("SecuritySettings")}
    //           margin="20 0 20 0"
    //           icon="Security"
    //         >
    //           Security
    //         </IconButton>
    //         {hasPassedKYC() && (
    //           <IconButton
    //             onPress={() => actions.navigateTo("WalletSettings")}
    //             margin="0 0 20 0"
    //             icon="WalletSettings"
    //           >
    //             Wallet
    //           </IconButton>
    //         )}
    //         {hasPassedKYC() && (
    //           <IconButton
    //             onPress={() => actions.navigateTo("ApiAuthorization")}
    //             margin="0 0 20 0"
    //             icon="Api"
    //           >
    //             API
    //           </IconButton>
    //         )}
    //         <IconButton
    //           onPress={() => actions.navigateTo("Appearance")}
    //           margin="0 0 20 0"
    //           icon="Appearance"
    //         >
    //           Appearance
    //         </IconButton>
    //       </ExpandableItem>
    //
    //       <ExpandableItem heading={"REPORTS"} isExpanded margin={"0 0 10 0"}>
    //         <CelText margin={"0 0 20 0"}>
    //           Receive your total transaction history report via email.
    //         </CelText>
    //         <IconButton
    //           onPress={() => this.sendCsvRequest()}
    //           margin="0 0 20 0"
    //           icon="Mail"
    //           color={"blue"}
    //           hideIconRight
    //           disabled={disabled}
    //         >
    //           Download transaction history
    //         </IconButton>
    //       </ExpandableItem>
    //
    //       <Separator margin={"0 0 20 0"} text={"FOLLOW US"} />
    //
    //       <View style={style.socialIcons}>
    //         <TouchableOpacity
    //           onPress={() =>
    //             Linking.openURL("https://twitter.com/CelsiusNetwork")
    //           }
    //         >
    //           <Icon
    //             name={"Twitter"}
    //             width={35}
    //             height={35}
    //             fill={
    //               theme === THEMES.LIGHT
    //                 ? STYLES.COLORS.DARK_GRAY3
    //                 : STYLES.COLORS.WHITE_OPACITY5
    //             }
    //           />
    //           <CelText type={"H6"} margin={"5 0 0 0"}>
    //             Twitter
    //           </CelText>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() =>
    //             Linking.openURL("https://www.facebook.com/CelsiusNetwork/")
    //           }
    //         >
    //           <Icon
    //             name={"Facebook"}
    //             width={35}
    //             height={35}
    //             fill={
    //               theme === THEMES.LIGHT
    //                 ? STYLES.COLORS.DARK_GRAY3
    //                 : STYLES.COLORS.WHITE_OPACITY5
    //             }
    //           />
    //           <CelText type={"H6"} margin={"5 0 0 0"}>
    //             Facebook
    //           </CelText>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() =>
    //             Linking.openURL("https://www.reddit.com/r/CelsiusNetwork/")
    //           }
    //         >
    //           <Icon
    //             name={"Reddit"}
    //             width={35}
    //             height={35}
    //             fill={
    //               theme === THEMES.LIGHT
    //                 ? STYLES.COLORS.DARK_GRAY3
    //                 : STYLES.COLORS.WHITE_OPACITY5
    //             }
    //           />
    //           <CelText type={"H6"} margin={"5 0 0 0"}>
    //             Reddit
    //           </CelText>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() => Linking.openURL("https://t.me/celsiusnetwork")}
    //         >
    //           <Icon
    //             name={"Telegram"}
    //             width={35}
    //             height={35}
    //             fill={
    //               theme === THEMES.LIGHT
    //                 ? STYLES.COLORS.DARK_GRAY3
    //                 : STYLES.COLORS.WHITE_OPACITY5
    //             }
    //           />
    //           <CelText type={"H6"} margin={"5 0 0 0"}>
    //             Telegram
    //           </CelText>
    //         </TouchableOpacity>
    //       </View>
    //       <Separator margin={"20 0 0 0"} />
    //
    //       <View style={style.bottomSegment}>
    //         <CelButton
    //           textSize="H6"
    //           basic
    //           onPress={() => {
    //             Linking.openURL("https://celsius.network/terms-of-use/");
    //           }}
    //           textColor={STYLES.COLORS.CELSIUS_BLUE}
    //         >
    //           See Terms of Use
    //         </CelButton>
    //         <CelText weight="light" align="center" type="H7">
    //           {`App Version: ${revisionId}`}
    //         </CelText>
    //       </View>
    //
    //       {ENV === "STAGING" ? (
    //         <CelButton
    //           margin="10 0 0 0"
    //           basic
    //           onPress={() => actions.navigateTo("Storybook")}
    //         >
    //           Open Storybook
    //         </CelButton>
    //       ) : null}
    //     </View>
    //
    //     <ReferralSendModal />
    //     <RegisterPromoCodeModal type={"celsius"} />
    //   </RegularLayout>
    // );
  }
}

export default Profile;
