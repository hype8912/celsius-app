import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import { BANK_ACCOUNT_TYPE } from "../../../constants/DATA";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

@connect(
  state => ({
    userProfile: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    bankAccountInfo: state.user.bankAccountInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowBankAccount extends Component {
  static navigationOptions = () => ({
    title: "Link bank account",
    customCenterComponent: { steps: 8, currentStep: 6, flowProgress: true },
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const { actions, userProfile } = this.props;
    actions.updateFormField("bank_location", { name: userProfile.country });
    if (userProfile.country === "United States")
      actions.updateFormField("bank_us_state", userProfile.state);
    this.getExistingBankAccountData();
  }

  getExistingBankAccountData() {
    const { bankAccountInfo, actions } = this.props;

    if (!bankAccountInfo) return;

    actions.updateFormFields({
      bank_name: bankAccountInfo.bank_name,
      bank_account_number: bankAccountInfo.bank_account_number,
      bank_routing_number: bankAccountInfo.bank_routing_number,
      selectedAccountType: "Checking",
      bank_city: bankAccountInfo.bank_city,
      bank_street_and_number: bankAccountInfo.bank_street_and_number,
      bank_account_holder_name: bankAccountInfo.bank_account_holder_name,
      bank_zip: bankAccountInfo.bank_zip,
      swift: bankAccountInfo.swift,
      iban: bankAccountInfo.iban,
      bank_location: { name: bankAccountInfo.location },
      bank_us_state: bankAccountInfo.state,
    });
  }

  linkBankAccount = async () => {
    const { actions, formData } = this.props;
    const isAmerican = this.isAmerican();

    const hasErrors = this.validateBankInfo();
    if (hasErrors) return;

    const bankAccountInfo = {
      bank_name: formData.bank_name,
      bank_routing_number: formData.bank_routing_number,
      account_type: formData.selectedAccountType,
      bank_city: formData.bank_city,
      bank_street_and_number: formData.bank_street_and_number,
      bank_account_holder_name: formData.bank_account_holder_name,
      bank_zip: formData.bank_zip,
      bank_account_number: formData.bank_account_number,
      swift: formData.swift,
      iban: formData.iban,
      location: formData.bank_location.name,
      state: formData.bank_us_state,
    };

    if (isAmerican) {
      delete bankAccountInfo.swift;
      delete bankAccountInfo.iban;
    } else {
      delete bankAccountInfo.bank_account_number;
      delete bankAccountInfo.bank_routing_number;
    }

    this.setState({ isLoading: true });
    await actions.linkBankAccount(bankAccountInfo);
    await mixpanelAnalytics.loanBankInfo();
    this.setState({ isLoading: false });
  };

  validateBankInfo = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    if (!formData.bank_name) formErrors.bank_name = "Field is required!";
    if (!formData.bank_routing_number)
      formErrors.bank_routing_number = "Field is required!";
    if (!formData.selectedAccountType)
      formErrors.selectedAccountType = "Field is required!";
    if (!formData.bank_city) formErrors.bank_city = "Field is required!";
    if (!formData.bank_street_and_number)
      formErrors.bank_street_and_number = "Field is required!";
    if (!formData.bank_account_holder_name)
      formErrors.bank_account_holder_name = "Field is required!";
    if (!formData.bank_zip) formErrors.bank_zip = "Field is required!";
    if (!formData.bank_account_number)
      formErrors.bank_account_number = "Field is required!";
    if (!formData.swift) formErrors.swift = "Field is required!";
    if (!formData.iban) formErrors.iban = "Field is required!";
    if (!formData.bank_location.name)
      formErrors.bank_location = "Field is required!";
    if (this.isAmerican() && !formData.bank_us_state)
      formErrors.bank_us_state = "Field is required!";

    if (this.isAmerican()) {
      delete formErrors.swift;
      delete formErrors.iban;
    } else {
      delete formErrors.bank_account_number;
      delete formErrors.bank_routing_number;
    }

    actions.setFormErrors(formErrors);

    return Object.keys(formErrors).length;
  };

  isAmerican = () => {
    const { formData } = this.props;
    return (
      formData.bank_location && formData.bank_location.name === "United States"
    );
  };

  render() {
    const { isLoading } = this.state;
    const { formData, formErrors } = this.props;
    const isAmerican = this.isAmerican();

    // TODO Check how should bank data be sent to back

    return (
      <View style={{ flex: 1 }}>
        <RegularLayout fabType={"hide"}>
          <CelText
            weight="300"
            type="H4"
            margin={"0 0 30 0"}
            style={{ alignSelf: "flex-start" }}
          >
            Provide us with your bank account details:
          </CelText>

          <CelSelect
            type="country"
            field="bank_location"
            labelText="Bank Location"
            showCountryFlag
            hideCallingCodes
            value={formData.bank_location}
            error={formErrors.bank_location}
          />

          {this.isAmerican() && (
            <CelSelect
              type="state"
              field="bank_us_state"
              labelText="Bank State"
              value={formData.bank_us_state}
              error={formErrors.bank_us_state}
              margin="0 0 20 0"
            />
          )}

          <CelInput
            placeholder="Bank name"
            field={"bank_name"}
            value={formData.bank_name}
            error={formErrors.bank_name}
            returnKeyType={"next"}
            blurOnSubmiting={false}
            onSubmitEditing={() => {
              this.bank_city.focus();
            }}
          />

          <CelInput
            placeholder="Bank City"
            field={"bank_city"}
            value={formData.bank_city}
            error={formErrors.bank_city}
            returnKeyType={"next"}
            blurOnSubmiting={false}
            refs={input => {
              this.bank_city = input;
            }}
            onSubmitEditing={() => {
              this.bank_street_and_number.focus();
            }}
          />

          <CelInput
            placeholder="Bank Street and Number"
            field={"bank_street_and_number"}
            value={formData.bank_street_and_number}
            error={formErrors.bank_street_and_number}
            returnKeyType={"next"}
            blurOnSubmiting={false}
            refs={input => {
              this.bank_street_and_number = input;
            }}
            onSubmitEditing={() => {
              this.bank_account_holder_name.focus();
            }}
          />

          <CelInput
            placeholder="Account Holder Name"
            field={"bank_account_holder_name"}
            value={formData.bank_account_holder_name}
            error={formErrors.bank_account_holder_name}
            returnKeyType={"next"}
            blurOnSubmiting={false}
            refs={input => {
              this.bank_account_holder_name = input;
            }}
            onSubmitEditing={() => {
              this.bank_zip.focus();
            }}
          />

          <CelInput
            placeholder="Bank Zip"
            field={"bank_zip"}
            value={formData.bank_zip}
            error={formErrors.bank_zip}
            returnKeyType={"next"}
            blurOnSubmiting={false}
            refs={input => {
              this.bank_zip = input;
            }}
            onSubmitEditing={() => {
              if (isAmerican) {
                this.bank_account_number.focus();
              } else {
                this.iban.focus();
              }
            }}
          />

          {isAmerican ? (
            <>
              <CelInput
                placeholder="Account Number"
                field={"bank_account_number"}
                value={formData.bank_account_number}
                error={formErrors.bank_account_number}
                returnKeyType={"next"}
                blurOnSubmiting={false}
                refs={input => {
                  this.bank_account_number = input;
                }}
                onSubmitEditing={() => {
                  this.bank_routing_number.focus();
                }}
              />

              <CelInput
                placeholder="ABA (Routing Number)"
                field={"bank_routing_number"}
                value={formData.bank_routing_number}
                error={formErrors.bank_routing_number}
                returnKeyType={"next"}
                blurOnSubmiting={false}
                refs={input => {
                  this.bank_routing_number = input;
                }}
              />
            </>
          ) : (
            <>
              <CelInput
                placeholder="Account Number (IBAN)"
                field={"iban"}
                value={formData.iban}
                error={formErrors.iban}
                returnKeyType={"next"}
                blurOnSubmiting={false}
                refs={input => {
                  this.iban = input;
                }}
                onSubmitEditing={() => {
                  this.swift.focus();
                }}
              />

              <CelInput
                placeholder="SWIFT (Bank Identifier Code)"
                field={"swift"}
                value={formData.swift}
                error={formErrors.swift}
                returnKeyType={"next"}
                blurOnSubmiting={false}
                refs={input => {
                  this.swift = input;
                }}
              />
            </>
          )}

          <CelText
            weight="300"
            type="H4"
            style={{ alignSelf: "flex-start" }}
            margin={"0 0 10 0"}
          >
            Account type:
          </CelText>
          <CelSelect
            items={BANK_ACCOUNT_TYPE}
            field={"selectedAccountType"}
            labelText={"Account type"}
            value={formData.selectedAccountType}
            error={formErrors.selectedAccountType}
          />

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <CelButton
              iconRight="IconArrowRight"
              onPress={this.linkBankAccount}
              loading={isLoading}
            >
              Continue
            </CelButton>
          </View>
        </RegularLayout>
      </View>
    );
  }
}

export default BorrowBankAccount;
