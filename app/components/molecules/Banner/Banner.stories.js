import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../../redux/store";
import CenterView from "../../../../storybook/stories/CenterView";
import Banner from "./Banner";
import STYLES from "../../../constants/STYLES";
import { MODALS } from "../../../constants/UI";
import { openModal } from "../../../redux/ui/uiActions";

storiesOf("Banner/Trigger", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("Pending", () => (
    <View style={{ marginBottom: 30 }}>
      <Banner
        backgroundColor={STYLES.COLORS.ORANGE}
        image={require("../../../../assets/images/kyc-icon.png")}
        title={"Your Profile Verification Is In Progress"}
        content={
          "It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours."
        }
        info={"additional info"}
      />
    </View>
  ))

  .add("Rejected", () => (
    <View style={{ marginBottom: 30 }}>
      <Banner
        backgroundColor={STYLES.COLORS.RED}
        image={require("../../../../assets/images/kyc-icon.png")}
        action={() => openModal(MODALS.REFERRAL_SEND_MODAL)}
        buttonText={"Verify Profile"}
        title={"Identity Verification Failed!"}
        textButtonText={"What went wrong"}
        textButtonAction={() => openModal(MODALS.KYC_REJECTION_REASONS_MODAL)}
        content={
          "Please go through the verification process again or contact our support for help."
        }
      />
    </View>
  ))
  .add("NoKYC/Referral Trigger", () => (
    <View style={{ marginBottom: 30 }}>
      <Banner
        backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
        image={require("../../../../assets/images/present-image.png")}
        action={() => openModal(MODALS.REFERRAL_SEND_MODAL)}
        buttonText={"Share referral code"}
        title={"Earn $20 with each referral!"}
        content={
          "Celsius now pays you and your friends $20 every time a new Celsian transfers $200 for 30 days."
        }
      />
    </View>
  ))
  .add("Loan Trigger", () => (
    <View style={{ marginBottom: 30 }}>
      <Banner
        backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
        image={require("../../../../assets/images/illustration-borrow-dollars_white.png")}
        action={() => {}}
        buttonText={"Get a loan"}
        title={"Did you know..."}
        content={`Celsius offers cash loans against your crypto? Borrow dollars or stablecoins and get the spending coins you need at the lowest rates in the industry!`}
      />
    </View>
  ));
