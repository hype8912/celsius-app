import React from "react";
import PropTypes from "prop-types";


import CelModal from "../../organisms/CelModal/CelModal";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";

const InfoModal = props => {
  const {
    name,
    heading,
    paragraphs,
    onYes,
    yesCopy,
    onNo,
    noCopy,
    support,
    children
  } = props;
  return (
    <CelModal name={name}>
      <CelText margin="20 0 15 0" align="center" type="H2" weight="bold">
        {heading}
      </CelText>

      {paragraphs &&
        paragraphs.map(paragraph => (
          <CelText
            margin="5 0 15 0"
            align="center"
            type="H4"
            weight={"300"}
            key={paragraph}
          >
            {paragraph}
          </CelText>
        ))}

      {children}

      {yesCopy && onYes ? (
        <CelButton margin="10 0 10 0" onPress={onYes}>
          {yesCopy}
        </CelButton>
      ) : null}

      {noCopy && onNo ? (
        <CelButton margin="10 0 10 0" onPress={onNo} basic>
          {noCopy}
        </CelButton>
      ) : null}

      {support ? <ContactSupport align="left"/> : null}
    </CelModal>
  );
};

InfoModal.propTypes = {
  name: PropTypes.string,
  heading: PropTypes.string,
  paragraphs: PropTypes.instanceOf(Array),
  support: PropTypes.bool,
  yesCopy: PropTypes.string,
  onYes: PropTypes.func,
  noCopy: PropTypes.string,
  onNo: PropTypes.func
};

export default InfoModal
