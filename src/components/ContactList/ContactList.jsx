import React from 'react';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDeleteConctact }) => (
  <ul className={css.contacts}>
    {contacts.map(({ id, name, number }) => (
      <li key={nanoid()} className={css.contact}>
        <p className={css.text}>
          {name} : {number}
        </p>
        <button className={css.btnDel} onClick={() => onDeleteConctact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
