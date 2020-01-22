import React from "react";

import EmptyState from "../EmptyState/EmptyState";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const EmptyStateStories = () => (
  <StoryWrapper title="EmptyState">
    <StoryWrapper title="Default state">
      <EmptyState
        purpose={"Some purpose"}
        image={require("../../../../assets/images/bear-happyKYC3x.png")}
        heading={"Empty State!!"}
        paragraphs={["Paragraph 1", "Paragraph 2"]}
        button={"Click me!"}
        onPress={() => {}}
        support
        secondaryButton={"Click me too!"}
        secondaryOnPress={() => {}}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default EmptyStateStories;
