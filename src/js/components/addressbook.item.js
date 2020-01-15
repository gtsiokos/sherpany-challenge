import React from 'react';
import ReactDOM from 'react-dom';

import Subscriber from '../subscribers';

import styles from '../../css/addressbook.css';

const AddressbookListItem = (props) => (
  <Subscriber.Addressbook>
  {
    (state, actions) => {
      let {selectContact} = actions;
      let [emailName] = props.email.split('@');

      return (
        <div className={styles.listItem}>
          <div className={styles.listItemHeader} onClick={(ev) => selectContact(props.login.uuid)}>
            <div className={styles.listItemThumbnail}>
              <img src={props.picture.thumbnail} />
            </div>
            <div className={styles.listItemName}>
              {`${props.name.first} ${props.name.last}`}
            </div>
          </div>
          <ul className={styles.listItemDetails}>
            <li className={styles.listItemDetail}>
              <span className={'fa fa-user'} />
              <span>{props.login.username}</span>
            </li>
            <li className={styles.listItemDetail}>
              <span className={'fa fa-envelope'} />
              <span><a href={`mailto: ${props.email}`}>{emailName}</a></span>
            </li>
          </ul>
        </div>
      );
    }
  }
  </Subscriber.Addressbook>
);

export default AddressbookListItem;