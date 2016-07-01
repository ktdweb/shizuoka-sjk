import VehiclesDispatcher from '../dispathcer/VehiclesDispatcher'
import VehiclesConstants from '../constants/VehiclesConstants'

export default {
  create: (id, callback) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.CREATE,
      id: id,
      callback: callback
    })
  },

  update: (id, count) => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.UPDATE,
      id: id,
      count: count
    })
  },

  destroy: () => {
    VehiclesDispatcher.dispatch({
      actionType: VehiclesConstants.DESTROY
    })
  }
}
