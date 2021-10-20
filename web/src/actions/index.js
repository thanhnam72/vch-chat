import * as types from '../constants/ActionTypes'

export const showLoading = () => dispatch => {
  dispatch({
    type: types.SHOW_LOADING
  })
}

export const hideLoading = () => dispatch => {
  dispatch({
    type: types.HIDE_LOADING
  })
}