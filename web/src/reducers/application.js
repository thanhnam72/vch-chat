import * as types from '../constants/ActionTypes'

var initState = {
  isLoading: false
};

var fnReducer = (state = initState, action) => {
	switch(action.type)
	{
		case types.SHOW_LOADING:
			return {
        ...state,
        isLoading: true
      };
		case types.HIDE_LOADING:
			return {
        ...state,
        isLoading: false
      }
		default:
			return state;
	}
}

export default fnReducer;