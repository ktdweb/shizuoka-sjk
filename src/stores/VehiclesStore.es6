import { EventEmitter } from 'events'
import VehiclesDispatcher from '../dispathcer/VehiclesDispatcher'
import VehiclesConstants from '../constants/VehiclesConstants'
import m from 'moment'

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

let integar = [
  'product_id',
  'category_id',
  'price',
  'maker_id',
  'size_id',
  'mileage',
  'capacity',
  'cc',
  'ps',
  'recycle'
];

let now = m().format('YYYY-MM-DD hh:mm:ss');

function create(page, res) {
  for (let i in res) {

    // checkboxをbooleanに変換
    for (let k of checkbox) {
      if (k in res[i]) {
        if (res[i][k] == null || res[i][k] == '') {
          res[i][k] = 0;
        }
        res[i][k] = Boolean(Number(res[i][k]));
      }
    }

    // integarに初期値を与える
    for (let k of integar) {
      if (k in res[i]) {
        if (res[i][k] == null || res[i][k] == '') {
          res[i][k] = 0;
        }
        res[i][k] = Number(res[i][k]);
      }
    }

    // null値だとwarningがでるため空文字へ変換
    for (let v in res[i]) {
      if (res[i][v] == null) {
        res[i][v] = '';
      }
    }

    _vehicles = res[i];
  }
  
  return _vehicles;
}

function toPhp(res) {
  for (let i in res) {
    // checkboxをbooleanに変換
    for (let k of checkbox) {
      if (k in res) {
        if (res[k] == false) {
          res[k] = 0;
        } else {
          res[k] = 1;
        }
      }
    }
  }

  res['modified'] = now;
  return res;
}

function update(res) {
  _vehicles = res;
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
        create(action.page, res);
        vehiclesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case VehiclesConstants.UPDATE:
      http.put(
          root + 'api/products/' + action.page + '/' + action.id,
          toPhp(action.data)
      ).then(res => {
        update(action.data)
        vehiclesStore.update();
      }).catch(e => {
        //console.error(e);
      });
      break;

    case VehiclesConstants.ADD:
      http.post(
          root + 'api/products/add/' + action.page + '/' + action.id,
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
