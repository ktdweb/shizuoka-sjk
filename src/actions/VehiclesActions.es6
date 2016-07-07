import VehiclesDispatcher from '../dispathcer/VehiclesDispatcher'
import VehiclesConstants from '../constants/VehiclesConstants'

export default {
  create: (page, id) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.CREATE,
      page: page,
      id: id
    })
  },

  update: (page, id, data, callback) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.UPDATE,
      page: page,
      id: id,
      data: data,
      callback: callback
    })
  },

  add: (page, id) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.ADD,
      page: page,
      id: id
    })
  },

  destroy: () => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.DESTROY
    })
  }
}
