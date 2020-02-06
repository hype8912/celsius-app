import React from "react";

import SimplexPaymentsHistory from "../SimplexPaymentsHistory/SimplexPaymentsHistory";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const SimplexPaymentsHistoryStories = () => (
  <StoryWrapper title="SimplexPaymentsHistory">
    <StoryWrapper title="Default state">
      <SimplexPaymentsHistory />
    </StoryWrapper>
  </StoryWrapper>
);

export default SimplexPaymentsHistoryStories;
