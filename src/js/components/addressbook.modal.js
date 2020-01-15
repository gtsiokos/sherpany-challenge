import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';
import uuid from 'uuid';

import Subscriber from '../subscribers';

import styles from '../../css/addressbook.css';

const AddressbookModal = (props) => (
  <Subscriber.Addressbook>
  {
    (state, actions) => {
      let {contacts, contacts_selected} = state;
      let {deselectContacts}            = actions;

      let [user] = contacts.filter(contact => contacts_selected.includes(contact.login.uuid));
      let contentStyle = {
        'width': '680rem',
        'padding': '28rem',
        'background': '#f2fffe',
        'border': '0',
        'borderRadius': '3rem'
      };
      let overlayStyle = {
        'background': 'rgba(33,67,67,0.7)'
      };
      
      return (
        <Popup modal 
          open={!!user} 
          contentStyle={contentStyle} 
          overlayStyle={overlayStyle}
          onClose={() => deselectContacts()}>
        {
          (close) => {

            return (
              <React.Fragment>
                <div className={styles.modalCloseBtn} onClick={() => close()}>
                  <span className={'fa fa-window-close'} />
                </div>
                <div className={styles.modalItem}>
                  <div className={styles.modalItemThumbnail}>
                    <img src={user.picture.large} />
                  </div>
                  <div style={{'flex':'1'}}>
                    <h2>{`${user.name.first} ${user.name.last}`}</h2>
                    <h3>Location</h3>
                    <div className={styles.modalItemLocation}>
                      <div>
                        <span>Street:</span>
                        <span>{user.location.street.name} {user.location.street.number}</span>
                      </div>
                      <div>
                        <span>City:</span>
                        <span>{user.location.city}</span>
                      </div>
                      <div>
                        <span>State:</span>
                        <span>{user.location.state}</span>
                      </div>
                      <div>
                        <span>Postcode:</span>
                        <span>{user.location.postcode}</span>
                      </div>
                    </div>
                    <h3>Contact</h3>
                    <div className={styles.modalItemContact}>
                      <div>
                        <span>Phone:</span>
                        <span>{user.phone}</span>
                      </div>
                      <div>
                        <span>Cell:</span>
                        <span>{user.cell}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }
        </Popup>
      );
    }
  }
  </Subscriber.Addressbook>
);

export default AddressbookModal;