import { createStore } from 'react-sweet-state';

import {parse} from 'query-string';
import {union, unionBy} from 'lodash';

import api from '../services/api';

let initialState = {
  contacts: [],
  contacts_selected: [],
  search_term: '',
  next_page: 1,
  settings: {
    nationality: 'CH',
    nationalities: ['CH', 'ES', 'FR', 'GB']
  }
}

let actions = {
  getContacts: (params) => async ({setState, getState}) => {
    let state = getState();

    let response = await api.get('/', {
      params: {nat:state.settings.nationality, ...params}
    });

    let page = response.data.info.page;
    let results = response.data.results;
    let is_first_page = !!(page == 1);
    let next_page = results.length
      ? is_first_page
        ? 3 // page 2 is already fetched when the first API call requested 40 items (page 1,2)
        : page+1
      : null; // when response array is empty notifies the component to stop fetching more pages 

    results = is_first_page 
      ? results
      : unionBy(state.contacts, results, (o) => o.id.value);
    //console.log(results)
    setState({
      contacts: results,
      next_page
    });
  },
  selectContact: (id) => ({setState, getState}) => {
    let state = getState();

    setState({
      contacts_selected: union(state.contacts_selected, [id])
    });
  },
  deselectContact: (id) => ({setState}) => {

  },
  deselectContacts: () => ({setState}) => {
    setState({
      contacts_selected: []
    });
  },
  findContact: (search_term) => ({setState, getState}) => {
    setState({
      search_term
    });
  },
  updateSettings: ({nationality}) => ({setState, getState}) => {
    let {contacts, settings} = getState();

    if(nationality && nationality != settings.nationality){
      setState({
        contacts: [],
        next_page: 1,
        settings: {...settings, nationality}
      });
    }
  }
}

export default createStore({initialState, actions});