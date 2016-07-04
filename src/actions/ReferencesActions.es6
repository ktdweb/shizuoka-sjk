import ReferencesDispatcher from '../dispathcer/ReferencesDispatcher'
import ReferencesConstants from '../constants/ReferencesConstants'

export default {
  create: () => {
    ReferencesDispatcher.dispatch({
      actionType: ReferencesConstants.CREATE
    })
  },

  destroy: () => {
    ReferencesDispatcher.dispatch({
      actionType: ReferencesConstants.DESTROY
    })
  }
}
