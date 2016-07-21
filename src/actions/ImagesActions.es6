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

  updatePdf: (id, data, callback) => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.UPDATEPDF,
      id: id,
      data: data,
      callback: callback
    })
  },

  del: (id, data, callback) => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.DEL,
      id: id,
      data: data,
      callback: callback
    })
  },

  delPdf: (id, callback) => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.DELPDF,
      id: id,
      callback: callback
    })
  },

  destroy: () => {
    ImagesDispatcher.dispatch({
      actionType: ImagesConstants.DESTROY
    })
  }
}
