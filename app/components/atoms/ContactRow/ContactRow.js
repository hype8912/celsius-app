import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ContactRowStyle from "./ContactRow.styles";
import CelText from "../CelText/CelText";
import Icon from "../Icon/Icon";
import { CONTACT_NETWORK } from "../../../constants/DATA";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

class ContactRow extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.string,
      profile_image: PropTypes.string,
      network: PropTypes.string,
    }).isRequired,
    hasApp: PropTypes.bool,
  };

  static defaultProps = {
    hasApp: false,
  };

  getContactPreference = contact =>
    contact.email ? contact.email : contact.phone_number;

  getNetworkImageUrl = network => {
    switch (network) {
      case CONTACT_NETWORK.PHONE:
        return require("../../../../assets/images/icons/contacts-circle/contacts-circle.png");
      case CONTACT_NETWORK.FACEBOOK:
        return require("../../../../assets/images/icons/fb-circle/fb-circle.png");
      case CONTACT_NETWORK.TWITTER:
        return require("../../../../assets/images/icons/tw-circle/tw-circle.png");
      default:
        return require("../../../../assets/images/icons/contacts-circle/contacts-circle.png");
    }
  };

  render() {
    const { contact, onPress, hasApp } = this.props;
    const styles = ContactRowStyle();
    const imgUrl = contact.item.profile_image
      ? { uri: contact.item.profile_image }
      : require("../../../../assets/images/empty-profile/empty-profile.png");
    const networkImage = this.getNetworkImageUrl(contact.item.network);

    const name =
      contact.item.name && contact.item.name.includes("null")
        ? contact.item.name.split(" ")[0]
        : contact.item.name;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.contactImageWrapper}>
            <Image
              source={imgUrl}
              resizeMode="cover"
              style={styles.contactImage}
            />
            <Image
              source={networkImage}
              resizeMode="cover"
              style={styles.networkImage}
            />
          </View>
          <View style={styles.info}>
            <CelText type="H3">{name}</CelText>
            <CelText color={getColor(COLOR_KEYS.BANNER_INFO)} type="H6">
              {this.getContactPreference(contact.item)}
            </CelText>
          </View>
        </View>
        {hasApp && (
          <Icon
            name="Celsius"
            fill={getColor(COLOR_KEYS.BANNER_INFO)}
            height={30}
            width={30}
          />
        )}
      </TouchableOpacity>
    );
  }
}

export default ContactRow;
