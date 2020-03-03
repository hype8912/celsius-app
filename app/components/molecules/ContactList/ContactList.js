import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';



import ContactListStyle from "./ContactList.styles";
import ContactRow from '../../atoms/ContactRow/ContactRow';
import Separator from '../../atoms/Separator/Separator';
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
        })),
      friendsWithoutApp: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          network: PropTypes.string,
          phone_number: PropTypes.string,
          profile_image: PropTypes.string,
        })),
    }).isRequired
  };

  renderSeparator = () => (
    <View style={{marginTop: 25}}>
      <Separator />
    </View>
  );

  renderContactsWithApp = () => {
    const { contacts, onContactPress } = this.props;

    const sortedContacts = contacts.friendsWithApp.sort((a,b) => {
      if (a.name[0] < b.name[0])
        return -1;
      if (a.name[0] > b.name[0])
        return 1;
      return 0;
    })

    return (
      sortedContacts.map(contact => <ContactRow key={contact.id} contact={contact} hasApp onPress={() => onContactPress(contact)}/>)
    )
  };

  renderContactsWithoutApp = () => {
    const { contacts } = this.props;

    return (
      <View style={{width: '100%'}}>
        {contacts.friendsWithApp && contacts.friendsWithApp.length ? this.renderSeparator() : null}
        {contacts.friendsWithoutApp.map(contact => <ContactRow key={contact.id} contact={contact}/>)}
      </View>
    )
  };

  render() {
    const { contacts } = this.props;
    const style = ContactListStyle();
    const RenderContactsWithApp = this.renderContactsWithApp;

    return (
      <ScrollView style={style.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <View>
          {contacts.friendsWithApp && contacts.friendsWithApp.length ? <RenderContactsWithApp/> : <EmptyState purpose={EMPTY_STATES.NO_CONTACTS} />}
        </View>
      </ScrollView>
    );
  }
}

export default ContactList
