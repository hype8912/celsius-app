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
    body = "Your email is required in order to receive rewards.";
    cta = "Contact support";
    onPress = () => Linking.openURL("mailto:app@celsius.network");
  }

  if (!hasAddress()) {
    title = "We’re missing your address.";
    body =
      "Residential details are required in order to receive rewards. Please contact Celsius support to update your address.";
    cta = "Celsius support";
    onPress = () => Linking.openURL("mailto:app@celsius.network");
    hasNoAddress = true;
  }

  if (!hasSSN()) {
    title = "Your Social Security Number is Missing.";
    body =
      "Taxpayer details are required in order to receive rewards on your crypto. Enter your SSN link to profile details.";
    cta = "Enter your SSN";
    onPress = () => navigateTo("PersonalInformation");
  }

  return (
    <Card color={getColor(COLOR_KEYS.LINK)} close>
      <CelText
        color={getColor(COLOR_KEYS.HEADLINE)}
        type="H6"
        weight="bold"
        margin="0 10 3 0"
      >
        {title}
      </CelText>
      {hasNoAddress ? (
        <Fragment>
          <CelText color={getColor(COLOR_KEYS.HEADLINE)} type="H7">
            {body}
            <CelText
              onPress={onPress}
              color={STYLES.COLORS.WHITE_OPACITY7} // TODO: missing COLOR_KEYS
              type="H7"
              margin="3 0 0 0"
            >
              {` ${cta}`}
            </CelText>
          </CelText>
        </Fragment>
      ) : (
        <Fragment>
          <CelText color={getColor(COLOR_KEYS.HEADLINE)} type="H7">
            {body}
          </CelText>
          <CelText
            onPress={onPress}
            color={STYLES.COLORS.WHITE_OPACITY7} // TODO: missing COLOR_KEYS
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
