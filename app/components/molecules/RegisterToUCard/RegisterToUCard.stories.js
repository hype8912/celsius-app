import React from "react";
import { updateFormField } from "../../../redux/forms/formsActions";
import RegisterToUCard from "./RegisterToUCard";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const RegisterToUCardStories = () => (
  <StoryWrapper title="RegisterToUCard">
    <StoryWrapper title="Checked">
      <RegisterToUCard termsOfUse updateFormField={updateFormField} />
    </StoryWrapper>
    <StoryWrapper title="Unchecked">
      <RegisterToUCard updateFormField={updateFormField} />
    </StoryWrapper>
  </StoryWrapper>
);

export default RegisterToUCardStories;
