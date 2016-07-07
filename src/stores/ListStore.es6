import { EventEmitter } from 'events'
import ListDispatcher from '../dispathcer/ListDispatcher'
import ListConstants from '../constants/ListConstants'

import { http } from '../components/Http'

let pathname = window.location.pathname;
let root = pathname.match(/^\/[a-z1-9_]+\//)[0];
const URL = root + 'api/products/';

const CHANGE_EVENT = 'change';

let _list = {};

function create(res, callback) {
  _list = res;

  callback();
  return _list;
}

function update(id, updates) {
  _list = { id: id, list: updates };
}

function destroy() {
  _list = {};
}

class ListStore extends EventEmitter {

  subscribe(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  read() {
    return _list;
  }
  
  update() {
    this.emit(CHANGE_EVENT);
  }

  destroy(callback) {
    this.removeAllListeners(CHANGE_EVENT, callback);
  }
}

ListDispatcher.register( function(action) {
  switch(action.actionType) {
    case ListConstants.CREATE:
      http.get(URL + action.page + '/').then(res => {
        create(res, action.callback);
        listStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case ListConstants.UPDATE:
      update(action.id, action.list + 1);
      listStore.update();
      break;

    case ListConstants.DESTROY:
      destroy();
      listStore.destroy();
      break;

    default:
      // no OP
  }
});

const listStore = new ListStore();
export default listStore;
