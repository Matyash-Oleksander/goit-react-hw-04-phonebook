class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  addConctact = data => {
    const { name, number } = data;
    const { contacts } = this.state;
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
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteConctact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
    // console.log(value);
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    // console.log(parsedContacts);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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

// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import Form from './Form/Form';
// import { nanoid } from 'nanoid';
// import ContactList from './ContactList/ContactList';
// import css from '../components/App.module.css';
// import Filter from './Filter/Filter';

// export default function App() {
//   const [filter, setFilter] = useState();
//   const [contacts, setContacts] = useState();

// static propTypes = {
//   contacts: PropTypes.array,
//   filter: PropTypes.string,
// };

// const addConctact = data => {
//   const { name, number } = data;
//   const { contacts } = contacts;
//   const normalizedFilter = name.toLowerCase();
//   const checkByName = contacts.find(
//     contact => contact.name.toLowerCase() === normalizedFilter
//   );

//   const contact = {
//     id: nanoid(),
//     name: name,
//     number: number,
//   };

//   if (checkByName) {
//     alert(`${name} is already in contacts`);
//     return;
//   }
//   setContacts({
//     contacts: [contact, ...contacts],
//   });
// };

// const deleteConctact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

// const changeFilter = evt => {
//   const { value } = evt.target;
//   setFilter({ value });
//   // console.log(value);
// };

// const getVisibleContacts = () => {
//   // const { contacts, filter } = this.state;
//   const normalizedFilter = filter.toLocaleLowerCase();
//   console.log(contacts);
//   return contacts.filter(contact =>
//     contact.name.toLocaleLowerCase().includes(normalizedFilter)
//   );
// };

// componentDidMount() {
//   const contacts = localStorage.getItem('contacts');
//   const parsedContacts = JSON.parse(contacts);

//   if (parsedContacts) {
//     this.setState({ contacts: parsedContacts });
//   }
//   // console.log(parsedContacts);
// }

// componentDidUpdate(prevProps, prevState) {
//   // console.log(prevState);
//   // console.log(this.state);
//   if (this.state.contacts !== prevState.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

//   return (
//     <div className={css.section}>
//       <h1>Phonebook</h1>
//       <Form onSubmit={addConctact} />

//       <h1>Contacts</h1>
//       <Filter value={filter} onChange={changeFilter} />
//       <ContactList
//         contacts={getVisibleContacts}
//         // onDeleteConctact={this.deleteConctact}
//       />
//     </div>
//   );
// }
