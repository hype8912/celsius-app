import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";
import InfoModalStyle from "./InfoModal.styles";
import CelButton from "../../atoms/CelButton/CelButton";

const InfoModal = props => {
  const {
    name,
    picture,
    darkPicture,
    pictureDimensions,
    heading,
    paragraphs,
    yesButtonPosition,
    noButtonPosition,
    yesButtonStyle,
    onYes,
    yesCopy,
    onNo,
    noCopy,
    coin,
    yesLoading,
    noLoading,
    noButtonStyle,
  } = props;

  const style = InfoModalStyle();
  return (
    <CelModal
      name={name}
      picture={picture}
      darkPicture={darkPicture || picture}
      pictureDimensions={pictureDimensions}
      coin={coin}
    >
      <View style={style.modalWrapper}>
        <View>
          <CelText margin={"0 40 15 40"} align="center" type="H2" weight="bold">
            {heading}
          </CelText>

          {paragraphs &&
            paragraphs.map(paragraph => (
              <CelText
                margin={"0 25 25 25"}
                align="center"
                type="H4"
                weight={"300"}
                key={paragraph}
              >
                {paragraph}
              </CelText>
            ))}
        </View>

        {noCopy ? (
          <CelButton onPress={onNo} basic color="red" margin="0 0 25 0">
            {noCopy}
          </CelButton>
        ) : null}

        <View style={style.buttonWrapper}>
          {yesCopy ? (
            <CelModalButton
              buttonStyle={yesButtonStyle}
              onPress={onYes}
              position={yesButtonPosition}
              loading={yesLoading}
            >
              {yesCopy}
            </CelModalButton>
          ) : null}

          {noCopy ? (
            <CelModalButton
              buttonStyle={noButtonStyle}
              onPress={onNo}
              position={noButtonPosition}
              loading={noLoading}
            >
              {noCopy}
            </CelModalButton>
          ) : null}
        </View>
      </View>
    </CelModal>
  );
};

InfoModal.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string,
  picture: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.number,
  ]),
  pictureDimensions: PropTypes.instanceOf(Object),
  paragraphs: PropTypes.instanceOf(Array),
  yesButtonStyle: PropTypes.string,
  yesCopy: PropTypes.string,
  onYes: PropTypes.func,
  noButtonStyle: PropTypes.string,
  noCopy: PropTypes.string,
  onNo: PropTypes.func,
  coin: PropTypes.string,
  loading: PropTypes.bool,
};

export default InfoModal;
