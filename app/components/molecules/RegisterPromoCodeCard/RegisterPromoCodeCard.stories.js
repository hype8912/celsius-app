import React from "react";
import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import RegisterPromoCodeCard from "./RegisterPromoCodeCard";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const RegisterPromoCodeCardStories = () => (
  <StoryWrapper title="RegisterPromoCodeCard">
    <StoryWrapper title="with Promo Code">
      <RegisterPromoCodeCard
        promoCode="Hello World"
        openModal={store.dispatch(openModal)}
      />
    </StoryWrapper>
    <StoryWrapper title="without Promo Code">
      <RegisterPromoCodeCard openModal={store.dispatch(openModal)} />
    </StoryWrapper>
  </StoryWrapper>
);

export default RegisterPromoCodeCardStories;
