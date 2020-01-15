import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, SafeAreaView } from "react-native";

import ContactListStyle from "./ContactList.styles";
import ContactRow from "../../atoms/ContactRow/ContactRow";

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.instanceOf(Array).isRequired,
    onContactPress: PropTypes.func.isRequired,
  };

  sortedContacts = () => {
    const { contacts } = this.props;

    const sortedContacts = contacts.sort((a, b) => {
      if (!a.name || !b.name) return -1;

      if (a.name[0] < b.name[0]) return -1;

      if (a.name[0] > b.name[0]) return 1;
      return 0;
    });

    return sortedContacts;
  };

  render() {
    const { onContactPress } = this.props;
    const style = ContactListStyle();
    const sortedContacts = this.sortedContacts();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={false}
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
      </SafeAreaView>
    );
  }
}

export default ContactList;
