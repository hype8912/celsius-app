import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import {
  Image,
  Linking,
  TouchableOpacity,
  View,
  Animated,
  Platform,
} from "react-native";
import { Extrapolate } from "react-native-reanimated";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
// import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import { MODALS } from "../../../constants/UI";
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
import Constants from "../../../../constants";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
// import Card from "../../atoms/Card/Card";

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
      revisionId: "",
      y: 0,
      yOffset: new Animated.Value(0),
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

  sendCsvRequest = async () => {
    const { actions } = this.props;
    await actions.sendCsvEmail();
  };

  getHeader = () => {
    const { yOffset } = this.state;
    const opacity = yOffset.interpolate({
      inputRange: [100, 200],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View
        style={{
          width: "100%",
          paddingTop: 20,
          paddingBottom: 15,
          paddingHorizontal: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: getColor(COLOR_KEYS.BACKGROUND),
          opacity,
        }}
      >
        <View style={{ marginLeft: -33 }}>
          <Icon name="IconChevronLeft" height={"25"} width={"25"} />
        </View>
        <View>
          <CelText type={"H2"} weight={"600"}>
            Your Profile
          </CelText>
        </View>
        <View>
          <Image
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,

              ...Platform.select({
                android: {
                  borderColor: "#E9E9E9",
                  borderWidth: 1,
                },
                ios: {
                  ...STYLES.SHADOW_STYLES,
                },
              }),
            }}
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
      </Animated.View>
    );
  };

  renderExpandedHeader = () => {
    const {
      profilePicture,
      user,
      actions,
      // kycStatus,
      // callsInProgress,
    } = this.props;
    const { yOffset } = this.state;
    // console.log("yOffset", yOffset);
    const opacity = yOffset.interpolate({
      inputRange: [20, 150],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View
        style={{
          // height: headerHeight,
          backgroundColor: getColor(COLOR_KEYS.BANNER_INFO),
          opacity,
        }}
      >
        <View
          style={{
            marginTop: 30,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 40,
          }}
        >
          <View style={{ marginLeft: -25 }}>
            <Icon
              name="IconChevronLeft"
              height={"25"}
              width={"25"}
              fill={getColor(COLOR_KEYS.TOGGLE_OFF_FOREGROUND)}
            />
          </View>
          <View>
            <CelText type={"H2"} weight={"600"}>
              Title
            </CelText>
          </View>
          <View
            style={{
              marginRight: 20,
            }}
          >
            <CelText color={getColor(COLOR_KEYS.SEPARATORS)}>Log out</CelText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            marginTop: 20,
            padding: 20,
          }}
        >
          {profilePicture ? (
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,

                borderWidth: 4,
                borderColor: getColor(COLOR_KEYS.CARDS),
              }}
              source={{
                uri: profilePicture,
                cache: "default",
              }}
              resizeMethod="resize"
            />
          ) : (
            <Image
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
            <CelText weight="600" type="H2" color={"white"}>
              {user.first_name}
            </CelText>
            <CelText weight="600" type="H2" color={"white"}>
              {user.last_name}
            </CelText>
            <TouchableOpacity
              onPress={() => actions.navigateTo("ChangeAvatar")}
            >
              <CelText margin="10 0 0 0" color={"white"}>
                Change photo
              </CelText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <View
            // color={getColor(COLOR_KEYS.PARAGRAPH)}
            // padding={"30 0 30 0"}
            style={{
              backgroundColor: getColor(COLOR_KEYS.PARAGRAPH),
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginVertical: 15,
                  flex: 0.45,
                }}
              >
                <Icon
                  name={"Present"}
                  height={"25"}
                  width={"25"}
                  fill={getColor(COLOR_KEYS.SEPARATORS)}
                />
                <View
                  style={{
                    width: 110,
                  }}
                >
                  <CelText
                    margin={"0 0 0 10"}
                    type={"H6"}
                    weight={"400"}
                    color={getColor(COLOR_KEYS.CARDS)}
                    align={"left"}
                  >
                    Enter your promo code
                  </CelText>
                </View>
              </View>
              <Separator vertical color={getColor(COLOR_KEYS.SECTION_TITLE)} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginVertical: 15,
                  flex: 0.45,
                }}
              >
                <Icon
                  name={"Refer"}
                  height={"25"}
                  width={"25"}
                  fill={getColor(COLOR_KEYS.CARDS)}
                />
                <View
                  style={{
                    width: 100,
                  }}
                >
                  <CelText
                    margin={"0 0 0 10"}
                    type={"H6"}
                    weight={"400"}
                    color={getColor(COLOR_KEYS.CARDS)}
                    align={"left"}
                  >
                    Refer your friends
                  </CelText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };
  handleScrollAnimation = val => {
    // console.log("val: ", val);
    this.setState({
      y: val,
      yOffset: new Animated.Value(val),
    });
  };
  render() {
    const { user, actions, kycStatus, callsInProgress } = this.props;
    const { revisionId, yOffset } = this.state;
    const style = ProfileStyle();
    const { ENV } = Constants;

    const disabled = apiUtil.areCallsInProgress(
      [API.GET_CSV_EMAIL],
      callsInProgress
    );

    return (
      <Animated.ScrollView
        horizontal={false}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: yOffset } } }],
          { useNativeDriver: true }
        )}
        style={{
          backgroundColor: getColor(COLOR_KEYS.BACKGROUND),
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          {this.getHeader()}
        </View>
        {this.renderExpandedHeader()}
        <KYCTrigger actions={actions} kycType={kycStatus} />
        <MissingInfoCard user={user} navigateTo={actions.navigateTo} />

        <View>
          <View
            style={{
              padding: 20,
            }}
          >
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
        </View>
      </Animated.ScrollView>
    );
  }
}

export default Profile;
