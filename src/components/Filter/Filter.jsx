import React from 'react';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={css.label}>
    Find contacts by name
    <input
      className={css.input}
      type="text"
      required
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Filter;
