import React from 'react';
import ReactDOM from 'react-dom';
import {DebounceInput} from 'react-debounce-input';

import Subscriber from '../subscribers';

import styles from '../../css/header.css';

const SearchInput = (props) => (
  <Subscriber.Addressbook>
  {
    (state, actions) => {
      let {findContact} = actions;

      return (
        <div>
          <label htmlFor={'search-input'} className={styles.searchIcon}>
            <span className={'fa fa-search'} />
          </label>
          <DebounceInput 
            minLength={2} 
            id={'search-input'}
            className={styles.searchInput}
            placeholder={'Search Contact'} 
            debounceTimeout={180} 
            onChange={ev => findContact(ev.target.value)} />
        </div>
      );
    }
  }
  </Subscriber.Addressbook>
);

export default SearchInput;