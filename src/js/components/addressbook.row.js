import React from 'react';
import ReactDOM from 'react-dom';

import AddressbookItem from './addressbook.item';

import styles from '../../css/addressbook.css';

const AddressbookRow = (props) => {

  return (
    <div className={styles.listRow}>
    {
      props.contacts.map(contact => <AddressbookItem key={contact.login.uuid} {...contact} />)
    }
    </div>
  );
};


export default AddressbookRow;