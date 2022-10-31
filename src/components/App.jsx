import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from './Form/Form';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import css from '../components/App.module.css';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  contactInputId = nanoid();
  nameInputId = nanoid();
  numberInputId = nanoid();

  renderContacts = () => {
    console.log(this.state.contacts);
    return this.state.contacts.map((id, name, number) => (
      <li>
        {name} : {number}
        <button className={css.btnAdd}> Delete </button>
      </li>
    ));
  };

  addConctact = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    const normalizedFilter = name.toLowerCase();
    const checkByName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    if (checkByName) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteConctact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
    console.log(value);
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addConctact} />

        <h1>Contacts</h1>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteConctact={this.deleteConctact}
        />
      </div>
    );
  }
}

export default App;
