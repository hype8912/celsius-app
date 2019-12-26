import React, { Component } from "react";
import { Linking, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import moment from "moment";
import * as appActions from "../../../redux/actions";
import PersonalInformationStyle from "./PersonalInformation.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { isUSCitizen } from "../../../utils/user-util";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import CelInput from "../../atoms/CelInput/CelInput";
import SocialSecurityNumber from "../../molecules/SocialSecurityNumber/SocialSecurityNumber";
import { KYC_STATUSES } from "../../../constants/DATA";
import KYCTrigger from "../../molecules/KYCTrigger/KYCTrigger";

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
class PersonalInformation extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Personal Information",
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false,
      isTaxInfoUpdated: false,
    };
  }

  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.user.itin !== this.props.user.itin &&
        nextProps.user.national_id !== this.props.user.national_id) ||
      nextProps.user.ssn !== this.props.user.ssn
    );
  }

  submitTaxpayerInfo = async () => {
    const { actions, formData } = this.props;
    let updateTaxInfo;
    const errors = {};
    if (isUSCitizen()) {
      // TODO(ns): this if statement does nothing and is unnecessary, should be removed
      if (
        !formData.ssn1 ||
        formData.ssn1.length < 3 ||
        (!formData.ssn2 || formData.ssn2.length < 2) ||
        (!formData.ssn3 || formData.ssn3.length < 4)
      ) {
        errors.ssn = "Please enter valid SSN.";
        actions.setFormErrors(errors);
        return;
      }

      updateTaxInfo = {
        ssn: formData.ssn1 + formData.ssn2 + formData.ssn3,
      };
    } else {
      updateTaxInfo = {
        national_id: formData.national_id,
        itin: formData.itin,
      };
    }
    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateTaxpayerInfo(updateTaxInfo);

    if (response.success) {
      actions.getProfileInfo();
      actions.showMessage(
        "success",
        "You have successfully submitted SSN number"
      );
    }
    this.setState({ updatingTaxInfo: false });
  };

  render() {
    const { user, actions, formErrors, kycStatus } = this.props;
    const { updatingTaxInfo } = this.state;
    const style = PersonalInformationStyle();
    const dateOfBirth = user.date_of_birth ? user.date_of_birth.split("-") : {};
    const userSetCountry = user.country !== null;

    return (
      <RegularLayout>
        <KYCTrigger actions={actions} kycType={kycStatus} />
        <CelText
          margin={"0 0 20 0"}
          align={"center"}
          weight={"300"}
          type={"H4"}
        >
          To make changes on your personal information
          <CelText
            weight={"300"}
            type={"H4"}
            color={STYLES.COLORS.CELSIUS_BLUE}
            onPress={() => Linking.openURL("mailto:app@celsius.network")}
          >
            {" contact our support."}
          </CelText>
        </CelText>
        {isUSCitizen() ? (
          <View>
            {userSetCountry && (
              <View>
                <Separator
                  margin={"10 0 20 0"}
                  color={STYLES.COLORS.DARK_GRAY}
                  opacity={0.2}
                  textOpacity={0.4}
                  text={"SOCIAL SECURITY NUMBER"}
                />

                {!user.ssn && (
                  <View>
                    <CelText
                      margin={"0 0 20 0"}
                      type={"H4"}
                      align={"left"}
                      weight={"300"}
                    >
                      We are required to collect SSN from all American users.
                      Please provide your SSN to start earning interest. This
                      information is encrypted and highly secured.
                    </CelText>
                  </View>
                )}
                <SocialSecurityNumber
                  onPress={this.submitTaxpayerInfo}
                  updatingTaxInfo={updatingTaxInfo}
                />
              </View>
            )}
          </View>
        ) : (
          <View>
            {userSetCountry && (
              <View>
                <Separator
                  margin={"10 0 20 0"}
                  color={STYLES.COLORS.DARK_GRAY}
                  opacity={0.2}
                  textOpacity={0.4}
                  text={"Taxpayer ID"}
                />

                <SocialSecurityNumber
                  onPress={() => this.submitTaxpayerInfo()}
                  updatingTaxInfo={updatingTaxInfo}
                />
              </View>
            )}
          </View>
        )}

        <Separator
          margin={"10 0 20 0"}
          color={STYLES.COLORS.DARK_GRAY}
          opacity={0.2}
          textOpacity={0.4}
          text={"PROFILE DETAILS"}
        />

        {!!user.first_name && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              First name
            </CelText>
            <CelInput field={"profileFirst"} disabled value={user.first_name} />
          </View>
        )}

        {!!user.last_name && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Last name
            </CelText>
            <CelInput field={"profileLast"} disabled value={user.last_name} />
          </View>
        )}

        {!!user.email && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Email
            </CelText>
            <CelInput
              field={"profileEmail"}
              disabled
              type="text"
              value={user.email}
            />
          </View>
        )}

        {!!user.date_of_birth && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Date of birth
            </CelText>
            <View style={style.addressInfo}>
              <CelInput
                field={"profileMonth"}
                margin={"0 20 0 0"}
                large={false}
                disabled
                type="text"
                value={moment(
                  [dateOfBirth[0], dateOfBirth[1]].join("-")
                ).format("MMM")}
              />
              <CelInput
                field={"profileDay"}
                margin={"0 20 0 0"}
                large={false}
                disabled
                type="text"
                value={dateOfBirth[2]}
              />
              <CelInput
                field={"profileYear"}
                margin={"0 20 0 0"}
                large={false}
                disabled
                type="text"
                value={dateOfBirth[0]}
              />
            </View>
          </View>
        )}

        {!!user.gender && (
          <View>
            <CelText margin={"10 0 10 0"} type={"H4"} weight={"300"}>
              Gender
            </CelText>
            <CelInput
              field={"profileGender"}
              disabled
              type="text"
              value={user.gender}
            />
          </View>
        )}

        {!!user.citizenship && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Citizenship
            </CelText>
            <CelInput
              field={"profileCitizenship"}
              disabled
              type="text"
              value={user.citizenship}
            />
          </View>
        )}

        {!!user.cellphone && (
          <CelInput
            type="text"
            field="profileCellphone"
            disabled
            placeholder="Phone number"
            error={formErrors.cellphone}
            value={user.cellphone_verified ? user.cellphone : ""}
            margin={"0 0 20 0"}
          />
        )}

        {!user.cellphone_verified && (
          <CelButton
            margin={"20 0 20 0"}
            onPress={() => actions.navigateTo("CellphoneEnter")}
          >
            Enter Phone Number
          </CelButton>
        )}

        <Separator
          margin={"10 0 20 0"}
          color={STYLES.COLORS.DARK_GRAY}
          opacity={0.2}
          textOpacity={0.4}
          text={"ADDRESS INFO"}
        />

        {!!user.street && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Street address
            </CelText>
            <CelInput
              field={"profileStreet"}
              disabled
              type="text"
              value={user.street}
            />
          </View>
        )}

        {!!user.building_number && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Building number
            </CelText>
            <CelInput
              field={"buildingNumber"}
              disabled
              type="text"
              value={user.building_number}
            />
          </View>
        )}

        {!!user.flat_number && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Apartment number
            </CelText>
            <CelInput
              field={"profileApartment"}
              disabled
              type="text"
              value={user.flat_number}
            />
          </View>
        )}

        {!!user.city && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              City
            </CelText>
            <CelInput
              field={"profileCity"}
              disabled
              type="text"
              value={user.city}
            />
          </View>
        )}

        {!!user.zip && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              ZIP / Postal Code
            </CelText>
            <CelInput
              field={"profileZip"}
              disabled
              type="text"
              value={user.zip}
            />
          </View>
        )}

        {!!user.country && (
          <View>
            <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>
              Country
            </CelText>
            <CelInput
              field={"profileCountry"}
              disabled
              type="text"
              value={user.country}
            />
          </View>
        )}
      </RegularLayout>
    );
  }
}

export default PersonalInformation;
