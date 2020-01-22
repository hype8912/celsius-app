import React from "react";

import PaymentListItem from "../PaymentListItem/PaymentListItem";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const payment = {};
const PaymentListItemStories = () => (
  <StoryWrapper title="PaymentListItem">
    <StoryWrapper title="Default state">
      <PaymentListItem type={"green"} payment={payment} />
    </StoryWrapper>
    <StoryWrapper title="Highlighted">
      <PaymentListItem type={"highlight"} payment={payment} />
    </StoryWrapper>
  </StoryWrapper>
);

export default PaymentListItemStories;
