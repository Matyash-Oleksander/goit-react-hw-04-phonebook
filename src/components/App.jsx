import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Form from './Form/Form';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import css from '../components/App.module.css';
import Filter from './Filter/Filter';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const addConctact = data => {
    const { name, number } = data;
    const normalizedFilter = name.toLowerCase();
    const checkByName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (checkByName) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(contacts => [...contacts, contact]);
    console.log(contacts);
  };

  const deleteConctact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = evt => {
    const { value } = evt.target;
    setFilter(value);
    console.log(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();
  // console.log(visibleContacts);

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <Form onSubmit={addConctact} />

      <h1>Contacts</h1>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteConctact={deleteConctact}
      />
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
