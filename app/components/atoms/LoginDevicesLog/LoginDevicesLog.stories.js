import React from "react";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import LoginDevicesLog from "./LoginDevicesLog";

const logExample = [
  {model: "SM-G935F", country: "Serbia", city: "Novi Sad", date: "2020-04-14T11:51:04.559Z"},
  {model: "iPhone XR", country: "Serbia", city: "Novi Sad", date: "2020-04-02T16:48:50.916Z"}
]

const LoginDevicesLogStories = () => (
  <StoryWrapper title="LoginDevicesLog">
      <LoginDevicesLog logData={logExample} />
  </StoryWrapper>
);

export default LoginDevicesLogStories;
