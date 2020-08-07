import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Linking } from "react-native";

import Card from "../Card/Card";
import STYLES from "../../../constants/STYLES";
import { hasSSN, hasAddress, hasPassedKYC } from "../../../utils/user-util";
import CelText from "../CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const MissingInfoCard = props => {
  const { user, navigateTo } = props;

  if ((user.email && hasSSN() && hasAddress()) || !hasPassedKYC()) return null;

  let title;
  let body;
  let cta;
  let onPress;
  let hasNoAddress = false;

  if (!user.email) {
    title = "Your email is missing from your profile.";
    body = "Your email is required in order to receive interest.";
    cta = "Contact support";
    onPress = () => Linking.openURL("mailto:app@celsius.network");
  }

  if (!hasAddress()) {
    title = "Your address is missing from your profile.";
    body =
      "Residence details are required in order to receive interest. To make changes to personal information please contact";
    cta = "Celsius support";
    onPress = () => Linking.openURL("mailto:app@celsius.network");
    hasNoAddress = true;
  }

  if (!hasSSN()) {
    title = "Your Social Security Number is missing from your profile.";
    body = "Taxpayer details (SSN) are required in order to receive interest.";
    cta = "Enter your SSN";
    onPress = () => navigateTo("PersonalInformation");
  }

  return (
    <Card color={getColor(COLOR_KEYS.LINK)} close>
      <CelText
        color={STYLES.COLORS.WHITE}
        type="H6"
        weight="bold"
        margin="0 10 3 0"
      >
        {title}
      </CelText>
      {hasNoAddress ? (
        <Fragment>
          <CelText color={STYLES.COLORS.WHITE} type="H7">
            {body}
            <CelText
              onPress={onPress}
              color={STYLES.COLORS.WHITE_OPACITY7}
              type="H7"
              margin="3 0 0 0"
            >
              {` ${cta}`}
            </CelText>
          </CelText>
        </Fragment>
      ) : (
        <Fragment>
          <CelText color={STYLES.COLORS.WHITE} type="H7">
            {body}
          </CelText>
          <CelText
            onPress={onPress}
            color={STYLES.COLORS.WHITE_OPACITY7}
            type="H7"
            margin="3 0 0 0"
          >
            {cta}
          </CelText>
        </Fragment>
      )}
    </Card>
  );
};

MissingInfoCard.propTypes = {
  user: PropTypes.instanceOf(Object),
  navigateTo: PropTypes.func,
};

export default MissingInfoCard;
