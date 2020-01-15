import React from 'react';
import ReactDOM from 'react-dom';
import {store} from 'react-notifications-component';

import Subscriber from '../subscribers';

import styles from '../../css/settings.css';

const notificationDefaults = {
  type: 'info',
  insert: 'top',
  width: 380,
  container: 'bottom-center',
  animationIn: ['animated', 'fadeInUp'],
  animationOut: ['animated', 'flipOutX'],
  dismiss: {
    duration: 2000
  }
};

const SettingsList = (props) => {
  let notify = (k, v) => {
    store.addNotification({
      ...notificationDefaults,
      message: `${k} has been changed to ${v}`
    });
  }

  return (
    <Subscriber.Addressbook>
    {
      (state, actions) => {
        let {settings} = state;
        let {updateSettings} = actions;

        return (
          <React.Fragment>
            <div className={styles.list}>
              <h2 className={styles.listHeader}>{'Address Book Settings'}</h2>
              <div className={styles.listItem}>
                <label>Nationality</label>
                <select 
                  value={settings.nationality} 
                  onChange={(ev) => {
                    updateSettings({nationality: ev.target.value});
                    notify('Address book nationality', ev.target.value);
                  }}>
                {
                  settings.nationalities.map(o => <option key={o} value={o}>{o}</option>)
                }
                </select>
              </div>
            </div>
          </React.Fragment>
        );
      }
    }
    </Subscriber.Addressbook>
  );
};

export default SettingsList;