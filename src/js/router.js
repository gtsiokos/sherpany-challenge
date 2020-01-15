import React from 'react';
import Loadable from 'react-loadable';
import ReactNotification from 'react-notifications-component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header';

const Loading = ({error}) => {
  if(error) console.log(error);
  return (
    <span>loading...</span>
  );
};

let Router = () => {
  const AddressbookPage = Loadable({loader: () => import('./pages/addressbook'), loading:Loading});
  const SettingsPage = Loadable({loader: () => import('./pages/settings'), loading:Loading});

  return (
    <BrowserRouter>
      <React.Fragment>

        <div className='container'>
          <Route component={Header} />
          <Route component={ReactNotification} />
          <Switch>
            <Route exact path='/' component={AddressbookPage} />
            <Route exact path='/settings' component={SettingsPage} />
          </Switch>
        </div>

      </React.Fragment>
    </BrowserRouter>
  );
}

export default Router;
