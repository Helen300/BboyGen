// define methods that take place on receiving actions
// these are events and when they happen, they signal for when
// you can do something else ... 
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		// must always contain a return type 
		// message received when we execute authStart
		type: actionTypes.AUTH_START
	}
}

// takes in a token
export const authSuccess= token => {
	return {
	
		type: actionTypes.AUTH_SUCCESS,
		token: token
	}
}


export const authFail = error => {
	return {

		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

// removes credentials from local storage to log user out
export const logout = () => {
	// just need to remove user credentials from browser 
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('username');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
}

// setting timer for our logout to take place, defined as 1 hr
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		// something that gets called when given time is over
		// logs out once expiration 
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000) // secs --> milliseconds
	}
}

// what you need to login = username, password 
// takes in username, password, then posts to backend 
export const authLogin = (username, password) => {
	return dispatch => {
		// an alert that we can look at 
		dispatch(authStart());
		// log the user in at this URL
		axios.post('/rest-auth/login/', {
			// the data that gets posted 
			username: username, 
			password: password
		})
		// to handle response
		.then(res => {
			// we get a key back 
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600 * 24000);
			// these are packages in the browser already 
			// can't just store it in the application, must store it in something that persists
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('username', username.trim());
			localStorage.setItem('menuKey', 'List')
			// successful login
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout(3600))
		})
		// if incorrect credentials, catch error 
		.catch(err => {
			dispatch(authFail('Username or password wrong'))
		})
	}
}

// parameters required by restframework, can be changed 
// pretty similar to login
export const authSignup = (username, email, password1, password2) => {
	return dispatch => {
		// an alert that we can look at 
		dispatch(authStart());
	
		// post to this URL 
		axios.post('/rest-auth/registration/', {
			// the data that gets posted 
			username: username, 
			email: email, 
			password1: password1, 
			password2: password2
		})
		// to handle response
		.then(res => {
			// we get a key back 
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600 * 24000);
			// these are packages in the browser already 
			// can't just store it in the application, must store it in something that persists
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('username', username.trim());
			localStorage.setItem('menuKey', 'List')
			// successful login
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout(3600))
				// create user model in django
			axios.post('/api/userprofiles/', {
				// the data that gets posted 
				username: username, 
				email: email,
				moveList: [],
			})
		})
		.catch(err => {
			dispatch(authFail(err))
		})
	}
}

export const authCheckState = () => {
	return dispatch => {
		// getting object, check if token is stored in local storage 
		const token = localStorage.getItem('token');
		// no such token 
		if (token == undefined) {
			dispatch(logout());
		}
		else {
			// get current expiration date 
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			// check if current expiration date is past now date 
			if ( expirationDate <= new Date()) {
				// already happened, therefore logout 
				dispatch(logout());
			}
			else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 24000));
			}
		}
	}
}