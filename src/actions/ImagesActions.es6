import ImagesDispatcher from '../dispathcer/ImagesDispatcher'
import ImagesConstants from '../constants/ImagesConstants'

export default {
  create: () => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.CREATE
    })
  },

  update: (page, id, data, callback) => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.UPDATE,
      page: page,
      id: id,
      data: data,
      callback: callback
    })
  },

  destroy: () => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.DESTROY
    })
  }
}
