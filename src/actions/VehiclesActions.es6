import VehiclesDispatcher from '../dispathcer/VehiclesDispatcher'
import VehiclesConstants from '../constants/VehiclesConstants'

export default {
  create: (id) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.CREATE,
      id: id
    })
  },

  update: (id, data, callback) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.UPDATE,
      id: id,
      data: data,
      callback: callback
    })
  },

  destroy: () => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.DESTROY
    })
  }
}
