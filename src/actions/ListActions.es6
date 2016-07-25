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

  del: (page, id) => {
    ListDispatcher.dispatch({
      actionType: ListConstants.DELETE,
      page: page,
      id: id
    })
  }
}
