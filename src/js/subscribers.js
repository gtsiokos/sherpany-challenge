import { createSubscriber } from 'react-sweet-state';

import Store from './store/index';

export default {
  Addressbook: createSubscriber(Store.Addressbook)
};

