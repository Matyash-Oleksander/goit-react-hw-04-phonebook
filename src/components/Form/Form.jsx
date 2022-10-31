import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from '../Form/Form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleNameChange = evt => {
    const { name, number, value } = evt.target;
    this.setState({ [name]: value, [number]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    console.log(name, number);

    this.props.onSubmit({ name, number });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId} className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleNameChange}
            id={this.nameInputId}
          />
        </label>

        <label htmlFor={this.numberInputId} className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleNameChange}
            id={this.numberInputId}
          />
        </label>
        <button type="submit" className={css.btnAdd}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
