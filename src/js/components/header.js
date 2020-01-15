import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

import SearchInput from './search.input';

import styles from '../../css/header.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <div className={styles.panel}>
        <div className={styles.navigation}>
          <NavLink 
            exact
            tabIndex={-1} 
            className={styles.link}
            activeClassName={styles.linkActive}
            to={'/'}>
            <span className={'fa fa-address-book'} />
            <span>Address Book</span>
          </NavLink>
          <NavLink 
            exact
            tabIndex={-1} 
            className={styles.link}
            activeClassName={styles.linkActive}
            to={'/settings'}>
            <span className={'fa fa-cogs'} />
            <span>Settings</span>
          </NavLink>
        </div>

        {props.location.pathname == '/'
          ? <SearchInput />
          : null
        }
      </div>
    </React.Fragment>
  );
};

export default Header;