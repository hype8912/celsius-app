import React from "react";

import HodlBanner from "../HodlBanner/HodlBanner";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const HodlBannerStories = () => (
  <StoryWrapper title="HodlBanner" style={{ marginVertical: 20 }}>
    <StoryWrapper title="HODL Mode ON">
      <HodlBanner status />
    </StoryWrapper>
    <StoryWrapper title="HODL Mode OFF">
      <HodlBanner status={false} />
    </StoryWrapper>
  </StoryWrapper>
);

export default HodlBannerStories;
