import ReferencesDispatcher from '../dispathcer/ReferencesDispatcher'
import ReferencesConstants from '../constants/ReferencesConstants'

export default {
  create: () => {
    ReferencesDispatcher.dispatch({
      actionType: ReferencesConstants.CREATE
    })
  },

  update: (id, count) => {
    ReferencesDispatcher.dispatch({
      actionType: ReferencesConstants.UPDATE,
      id: id,
      count: count
    })
  },

  destroy: () => {
    ReferencesDispatcher.dispatch({
      actionType: ReferencesConstants.DESTROY
    })
  }
}
