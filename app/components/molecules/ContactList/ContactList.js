import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";

import ContactListStyle from "./ContactList.styles";
import ContactRow from "../../atoms/ContactRow/ContactRow";
import Separator from "../../atoms/Separator/Separator";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import { EMPTY_STATES } from "../../../constants/UI";

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.shape({
      friendsWithApp: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          network: PropTypes.string,
          phone_number: PropTypes.string,
          profile_image: PropTypes.string,
        })
      ),
      friendsWithoutApp: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          network: PropTypes.string,
          phone_number: PropTypes.string,
          profile_image: PropTypes.string,
        })
      ),
    }).isRequired,
  };

  sortedContacts = () => {
    const { contacts } = this.props;

    const sortedContacts = contacts.friendsWithApp.sort((a, b) => {
      if (!a.name || !b.name) return -1;

      if (a.name[0] < b.name[0]) return -1;

      if (a.name[0] > b.name[0]) return 1;
      return 0;
    });

    return sortedContacts;
  };

  renderSeparator = () => (
    <View style={{ marginTop: 25 }}>
      <Separator />
    </View>
  );

  renderContactsWithoutApp = () => {
    const { contacts } = this.props;

    return (
      <View style={{ width: "100%" }}>
        {contacts.friendsWithApp && contacts.friendsWithApp.length
          ? this.renderSeparator()
          : null}
        {contacts.friendsWithoutApp.map(contact => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
      </View>
    );
  };

  render() {
    const { contacts, onContactPress } = this.props;
    const style = ContactListStyle();
    // const RenderContactsWithApp = this.renderContactsWithApp;

    const sortedContacts = this.sortedContacts();

    return (
      <View>
        {contacts.friendsWithApp && contacts.friendsWithApp.length ? (
          <FlatList
            style={style.container}
            data={sortedContacts}
            initialNumToRender={10}
            renderItem={contact => (
              <ContactRow
                key={contact.id}
                contact={contact}
                hasApp
                onPress={() => onContactPress(contact)}
              />
            )}
          />
        ) : (
          <EmptyState purpose={EMPTY_STATES.NO_CONTACTS} />
        )}
      </View>
    );
  }
}

export default ContactList;
