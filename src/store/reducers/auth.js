import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null, 
	error: null, 
	loading: false
}

// reducers job takes in initial state + action 
// then returns update state 
const authStart = (state, action) =>  {
	// returns object of this state and manipulate its value 
	return updateObject(state, {
		error: null, 
		loading: true
	});
}

// coming from action should be the token 
// when we dispatch authSuccess, takes in token and returns the object
const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token, 
		error: null, 
		// now we've been authenticated 
		loading: false
	})
}

const authFail = (state, action) => {
	return updateObject(state, {
		// update error state
		error: action.error,
		loading: false
	})
}


const authLogout = (state, action) => {
	return updateObject(state, {
		// we've logged out so no more token
		token: null, 
	})
}

// define when these actually take place
// define initial state above
const reducer = (state=initialState, action) => {
	switch (action.type) {
		// what type of action it is
		case actionTypes.AUTH_START : return authStart(state, action);
		case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
		case actionTypes.AUTH_FAIL : return authFail(state, action);
		case actionTypes.AUTH_LOGOUT : return authLogout(state, action);
		default:
			// do not do anything to it and return 
			return state; 
	}
}

export default reducer; 