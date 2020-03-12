import React from "react";

import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";
import ToggleInfoCard from "./ToggleInfoCard";

const ToggleInfoCardStories = () => (
  <StoryWrapper title="ToggleInfoCard">
    <StoryWrapper title="Enabled status">
      <ToggleInfoCard status={"enabled"} subtitle={"Your 3D Protection is"} />
    </StoryWrapper>

    <StoryWrapper title="Toggle mode">
      <ToggleInfoCard subtitle={"Your 3D Protection is"} />
    </StoryWrapper>
  </StoryWrapper>
);

export default ToggleInfoCardStories;
