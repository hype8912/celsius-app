import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { Constants } from "expo";
import { Image as RNImage, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import CelButton from "../../atoms/CelButton/CelButton";
import { MODALS } from "../../../constants/UI";
import ReferralSendModal from "../../organisms/ReferralSendModal/ReferralSendModal";
import RegisterPromoCodeModal from "../../organisms/RegisterPromoCodeModal/RegisterPromoCodeModal";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";

import { getFontSize } from '../../../utils/styles-util';
import { isUSCitizen } from "../../../utils/user-util";

const { revisionId } = Constants.manifest;

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Profile extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    // left: "back",
    title: "Your profile",
    right: "settings"
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false
    };
  }

  componentDidMount() {
    const { user, actions } = this.props;
    actions.profileTaxpayerInfo();
    this.initForm(user);
  }

  componentDidUpdate(prevProps) {
    const { user, actions } = this.props;
    if (prevProps.user.cellphone_verified !== user.cellphone_verified) {
      actions.updateFormFields({
        cellphone: user.cellphone,
      })
    }
  }

  initForm = (user) => {
    const { actions } = this.props;
    if (user) {
      actions.updateFormFields({
        ssn: user.ssn,
        cellphone_verified: user.cellphone_verified
      });
    }
  };

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutUser();
  };

  updateSSNNumber = async () => {
    const { actions, formData } = this.props;

    const ssn = { ssn: formData.ssn };

    this.setState({ updatingTaxInfo: true });
    await actions.updateTaxpayerInfo(ssn);
    this.setState({ updatingTaxInfo: false });
  };

  openReferralSendModal = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.REFERRAL_SEND_MODAL);
  };

  render() {
    const { profilePicture, user, actions, formData, formErrors } = this.props;
    const { updatingTaxInfo } = this.state;
    const ssn = user.ssn ? user.ssn : formData.ssn;

    return (
      <RegularLayout>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          {profilePicture ? (
            <Image
              style={{
                width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: STYLES.COLORS.WHITE
              }}
              uri={profilePicture}
              resizeMethod="resize"
            />
          ) : (
              <RNImage
                style={{
                  width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: STYLES.COLORS.WHITE
                }}
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                resizeMethod="resize"
              />
            )}
          <View style={{ marginLeft: 20 }}>
            <CelText weight="600" type="H2">{user.first_name}</CelText>
            <CelText weight="600" type="H2">{user.last_name}</CelText>
            <TouchableOpacity onPress={() => actions.navigateTo("ChangeAvatar")}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">Change photo</CelText>
            </TouchableOpacity>
          </View>
        </View>

        <IconButton onPress={this.openReferralSendModal} icon="Refer" color="blue">Refer your friends</IconButton>
        <IconButton
          onPress={() => actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
          margin="0 0 20 0"
          icon="Bell"
        >
          Enter a promo code
        </IconButton>

        <Separator />

        <CelInput margin="20 0 20 0" disabled type="text" field="email" placeholder="E-mail" value={user.email} />
        <CelInput type="text" field='cellphone' disabled placeholder='Phone number' error={formErrors.cellphone} value={user.cellphone_verified ? user.cellphone : ""} margin={"0 0 20 0"} />

        {!user.cellphone_verified &&
          <CelButton
            margin={"20 0 20 0"}
            onPress={() => actions.navigateTo("CellphoneEnter")}
          >
            Enter Phone Number
          </CelButton>
        }
        <ContactSupport
          content='flex-start'
          fontSize= {getFontSize()}
          align='left'
          copy="To make changes on your profile, contact our support at app@celsius.network."
        />
        {isUSCitizen() && (
          <View>
            <Separator margin={"10 0 20 0"} color={STYLES.COLORS.DARK_GRAY} opacity={0.2} textOpacity={0.4} text={"SOCIAL SECURITY NUMBER"} />

            {!user.ssn &&
              <View>
                <CelText margin={"0 0 20 0"} type={"H4"} weight={"300"}>
                  We are required to collect SSN from all American users. Please provide your SSN to start earning interest.
                  This information is encrypted and highly secured.
              </CelText>
              </View>
            }

            <CelInput margin="0 0 20 0"
              disabled={!!user.ssn}
              type={user.ssn ? "text" : "password"}
              field="ssn"
              placeholder="Social Security Number"
              value={ssn} error={formErrors.ssn}
              keyboardType={'phone-pad'}/>

            {!user.ssn &&
              <CelButton
                onPress={() => this.updateSSNNumber()}
                margin={"20 0 20 0"}
                loading={updatingTaxInfo}
                disabled={!formData.ssn}
              >
                Submit SSN
            </CelButton>
            }
          </View>
        )}
        <CelText margin="30 0 0 0" weight="light" align='center' type="H7">
          Celsius App version: {revisionId}
        </CelText>

        <ReferralSendModal />
        <RegisterPromoCodeModal type={"celsius"} />
      </RegularLayout>
    );
  }
}

export default Profile;
