import React from "react";
import Banner from "./Banner";
import STYLES from "../../../constants/STYLES";
import { MODALS } from "../../../constants/UI";
import { openModal } from "../../../redux/ui/uiActions";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const BannerStories = () => (
  <StoryWrapper title="Banner">
    <StoryWrapper>
      <Banner
        backgroundColor={STYLES.COLORS.ORANGE}
        image={require("../../../../assets/images/kyc-icon.png")}
        title={"Your Profile Verification Is In Progress"}
        content={
          "It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours."
        }
        info={"additional info"}
      />
    </StoryWrapper>
    <StoryWrapper>
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
    </StoryWrapper>
    <StoryWrapper>
      <Banner
        backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
        image={require("../../../../assets/images/present-image.png")}
        action={() => openModal(MODALS.REFERRAL_SEND_MODAL)}
        buttonText={"Share referral code"}
        title={"Refer & Earn!"}
        content={
          "How it works:\n" +
          "1. New user signs up with your referral code\n" +
          "2. New user deposits $200 or more in crypto\n" +
          "3. You and the new user each earn $10 in BTC!\n" +
          "\n"
        }
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default BannerStories;
