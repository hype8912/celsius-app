import React from "react";

import CelCheckbox from "../CelCheckbox/CelCheckbox";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import Icon from "../Icon/Icon";
import STYLES from "../../../constants/STYLES";

const CelCheckboxStories = () => (
  <StoryWrapper title="CelCheckbox">
    <StoryWrapper title="Default state">
      <StoryWrapper>
        <CelCheckbox
          color={STYLES.COLORS.GRAY}
          unChecked={<Icon name={"Unchecked"} height={"22"} width={"22"} />}
          onChange={() => {}}
        />
      </StoryWrapper>
      <StoryWrapper>
        <CelCheckbox
          checkedCheckBoxColor={STYLES.COLORS.GREEN}
          unChecked={<Icon name={"Checked"} height={"22"} width={"22"} />}
          onChange={() => {}}
        />
      </StoryWrapper>
      <StoryWrapper>
        <CelCheckbox
          isChecked
          onChange={() => {}}
          rightText={"With Right Text"}
        />
      </StoryWrapper>
      <StoryWrapper>
        <CelCheckbox
          isChecked
          loading
          rightText={"Is loading"}
          onChange={() => {}}
        />
      </StoryWrapper>
    </StoryWrapper>
  </StoryWrapper>
);

export default CelCheckboxStories;
