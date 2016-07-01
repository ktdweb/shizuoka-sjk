import { EventEmitter } from 'events'
import ReferencesDispatcher from '../dispathcer/ReferencesDispatcher'
import ReferencesConstants from '../constants/ReferencesConstants'

import { http } from '../components/Http'

let pathname = window.location.pathname;
let root = pathname.match(/^\/[a-z1-9_]+\//)[0];
const URL = root + 'api/references/';

const CHANGE_EVENT = 'change';

let _References = {};

function create(res) {
  _References = res;
  return _References;
}

function update(id, updates) {
  _References = { id: id, References: updates };
}

function destroy() {
  _References = {};
}

class ReferencesStore extends EventEmitter {

  subscribe(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  read() {
    return _References;
  }
  
  update() {
    this.emit(CHANGE_EVENT);
  }

  destroy(callback) {
    this.removeAllReferenceseners(CHANGE_EVENT, callback);
  }
}

ReferencesDispatcher.register( function(action) {
  switch(action.actionType) {
    case ReferencesConstants.CREATE:
      http.get(URL).then(res => {
        create(res);
        ReferencesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    default:
      // no OP
  }
});

const referencesStore = new ReferencesStore();
export default referencesStore;
