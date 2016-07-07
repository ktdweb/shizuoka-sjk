import ListDispatcher from '../dispathcer/ListDispatcher'
import ListConstants from '../constants/ListConstants'

export default {
  create: (page, callback) => {
    ListDispatcher.dispatch({
      actionType: ListConstants.CREATE,
      page: page,
      callback: callback
    })
  },

  update: (id, count) => {
    ListDispatcher.dispatch({
      actionType: ListConstants.UPDATE,
      id: id,
      count: count
    })
  },

  destroy: () => {
    ListDispatcher.dispatch({
      actionType: ListConstants.DESTROY
    })
  }
}
