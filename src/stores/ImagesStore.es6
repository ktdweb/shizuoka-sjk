import { EventEmitter } from 'events'
import ImagesDispatcher from '../dispathcer/ImagesDispatcher'
import ImagesConstants from '../constants/ImagesConstants'

import { http } from '../components/Http'

let pathname = window.location.pathname;
let root = pathname.match(/^\/[a-z1-9_]+\//)[0];
const URL = root + 'api/images/';

const CHANGE_EVENT = 'change';

let _images = {};

function create(res) {
  return _images;
}

function update(res, callback) {
    _images = res;
    callback();

    return _images;
}

function destroy() {
  _images = {};
}

class ImagesStore extends EventEmitter {

  subscribe(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  read() {
    return _images;
  }
  
  update() {
    this.emit(CHANGE_EVENT);
  }

  destroy(callback) {
    this.removeAllListeners(CHANGE_EVENT, callback);
  }
}

ImagesDispatcher.register( function(action) {
  switch(action.actionType) {
    case ImagesConstants.CREATE:
      http.get(URL + action.id).then(res => {
        create(res);
        imagesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case ImagesConstants.UPDATE:
      http.put(
          URL + action.page + '/' + action.id,
          action.data
      ).then(res => {
        update(res, action.callback);
        imagesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case ImagesConstants.DEL:
      http.delete(
          URL + action.id,
          action.data
      ).then(res => {
        update(res, action.callback);
        imagesStore.destroy();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case ImagesConstants.DESTROY:
      destroy();
      imagesStore.destroy();
      break;

    default:
      // no OP
  }
});

const imagesStore = new ImagesStore();
export default imagesStore;
