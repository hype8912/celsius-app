import React from "react";

import BuildVersion from "../BuildVersion/BuildVersion";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const BuildVersionStories = () => (
  <StoryWrapper title="BuildVersion">
    <StoryWrapper title="Default state">
      <BuildVersion />
    </StoryWrapper>
  </StoryWrapper>
);

export default BuildVersionStories;
