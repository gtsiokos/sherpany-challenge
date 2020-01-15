import React from 'react';
import ReactDOM from 'react-dom';

import AddressbookList from '../components/addressbook.list';
import AddressbookModal from '../components/addressbook.modal';

const AddressbookPage = (props) => (
  <React.Fragment>
    <AddressbookList />
    <AddressbookModal />
  </React.Fragment>
);

export default AddressbookPage;