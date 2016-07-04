import { EventEmitter } from 'events'
import VehiclesDispatcher from '../dispathcer/VehiclesDispatcher'
import VehiclesConstants from '../constants/VehiclesConstants'

import { http } from '../components/Http'

let pathname = window.location.pathname;
let root = pathname.match(/^\/[a-z1-9_]+\//)[0];
const URL = root + 'api/products/detail/';

const CHANGE_EVENT = 'change';

let _vehicles = {};

let checkbox = [
  'new_flag',
  'deal_flag',
  'soldout_flag',
  'recommend_flag',
  'ac_flag',
  'ps_flag'
];

function create(res) {
  for (let i in res) {
    // checkboxであれば1,0をbooleanに変換
    for (let k of checkbox) {
      res[i][k] = Boolean(Number(res[i][k]));
    }

    // null値だとwarningがでるため空文字へ変換
    for (let v in res[i]) {
      if (!res[i][v]) {
        res[i][v] = '';
      }
    }

    _vehicles = res[i];
  }
  
  return _vehicles;
}

function destroy() {
  _vehicles = {};
}

class VehiclesStore extends EventEmitter {

  subscribe(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  read() {
    return _vehicles;
  }
  
  update() {
    this.emit(CHANGE_EVENT);
  }

  destroy(callback) {
    this.removeAllListeners(CHANGE_EVENT, callback);
  }
}

VehiclesDispatcher.register( function(action) {
  switch(action.actionType) {
    case VehiclesConstants.CREATE:
      http.get(URL + action.id).then(res => {
        create(res);
        vehiclesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case VehiclesConstants.UPDATE:
      http.put(
          root + 'api/products/' + action.page + '/' + action.id,
          action.data
      ).then(res => {
        vehiclesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case VehiclesConstants.DESTROY:
      destroy();
      vehiclesStore.destroy();
      break;

    default:
      // no OP
  }
});

const vehiclesStore = new VehiclesStore();
export default vehiclesStore;
