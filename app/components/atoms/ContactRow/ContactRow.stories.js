import React from "react";

import ContactRow from "../ContactRow/ContactRow";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const contact = {
  id: 1,
  name: "Speedy Rabbit",
  email: "speedy@rabbit.com",
  phone_number: "111 - 111",
  profile_image: null,
  network: "Twitter",
};

const ContactRowStories = () => (
  <StoryWrapper title="ContactRow">
    <StoryWrapper title="Default state">
      <ContactRow contact={contact} />
    </StoryWrapper>
  </StoryWrapper>
);

export default ContactRowStories;
