import React, {useState, useRef, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import debounce from 'lodash/debounce';
import chunk from 'lodash/chunk';
import uuid from 'uuid';

import Subscriber from '../subscribers';
import AddressbookRow from './addressbook.row';

import styles from '../../css/addressbook.css';

const AddressbookList = (props) => {
  let [elementHeight, setElementHeight] = useState(100);
  let elementRef = useRef(null);
  
  useEffect(() => {
    let updateDimensions = debounce(() => {
      if(elementRef && elementRef.current) setElementHeight(elementRef.current.clientHeight);
    }, 500);
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.addEventListener('resize', updateDimensions);
  }, []);

  return (
    <Subscriber.Addressbook>
    {
      (state, actions) => {
        let {contacts, next_page, search_term} = state;

        if(search_term){
          contacts = contacts.filter(contact => (
            `${contact.name.first} ${contact.name.last}`.toLowerCase().startsWith(search_term.toLowerCase())
          ))
        }

        let chunks = chunk(contacts, 5);

        return (
          <React.Fragment>
            <div 
              ref={elementRef} 
              className={styles.listItem} 
              style={{'position': 'absolute', 'left': '-9000rem'}}>
            </div>
            <div className={styles.list}>
              <Infinite 
                containerHeight={680} 
                elementHeight={elementHeight}
                isInfiniteLoading={false}
                infiniteLoadBeginEdgeOffset={elementHeight*10}
                onInfiniteLoad={() => actions.getContacts({page:next_page, results:next_page === 1 ? 100 : 50})}>
                { chunks.map((contacts, i) => <AddressbookRow key={i} contacts={contacts} />) }
              </Infinite>
            </div>
          </React.Fragment>
        );
      }
    }
    </Subscriber.Addressbook>
  );
};

export default AddressbookList;