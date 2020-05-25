import React from "react";

import LoginButton from "./LoginButton";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import googleIcon from "../../../../assets/images/icons/googleIcon.png";

const LoginButtonStories = () => (
  <StoryWrapper title="LoginButton Stories">
    <StoryWrapper title="Styles">
      <LoginButton text="Log in with Google" icon={googleIcon} />
      <LoginButton text="Log in with Google" icon={googleIcon} disabled />
    </StoryWrapper>
  </StoryWrapper>
);

export default LoginButtonStories;
