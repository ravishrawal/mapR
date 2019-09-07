// UserReducer

import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const SET_CURRENT_USER_PLACES = 'SET_CURRENT_USER_PLACES';

// ACTION CREATORS
export function setCurrentUser(user) {
	return {
  	type: SET_CURRENT_USER,
    user
	};
}

export function removeCurrentUser() {
	return {
		type: REMOVE_CURRENT_USER,
		user: {}
	};
}

export function updateCurrentUser(user) {
	return {
		type: UPDATE_CURRENT_USER,
		user
	};
}

export function setCurrentUserPlaces(places) {
	return {
		type: SET_CURRENT_USER_PLACES,
		places
	}
}

// THUNK
export function verifyUser(credential){
	return function thunk (dispatch) {
		return axios.post('/auth/login', credential)
		  .then(res => res.data)
			.then(user => {
				if (user) {
					dispatch(setCurrentUser(user));
				}
			})
			.catch(err => { throw err; });
	};
}

export function getUser(userId){
	return axios.get(`/api/users/${userId}`)
					.then(res => {return res.data})
}

export function signupUser(user){
	return function thunk(dispatch) {
		return axios.post('/auth/signup', user)
			.then(res => res.data)
			.then((user) => {
				dispatch(setCurrentUser(user));
			})
			.catch(err => { throw err; });
	};
}



export function logoutCurrentUser(){
	return function thunk(dispatch){
		return axios.post('/auth/logout')
					.then(() => {
						dispatch(removeCurrentUser());
					})
					.catch( err => { throw err; });
	}
}

export function updateUser(place){
	return function thunk(dispatch, getState){
    var currentUser = getState().user;
		return axios.put(`/api/users/${currentUser.id}`, {place})
					 .then(user => {
						dispatch(updateCurrentUser(user));
            dispatch(setCurrentUser(user));
					 })
					 .catch( err => { throw err; });
	}
}

export function getFBUserPlaces(userId){
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				console.log('logged in');
				FB.api('/me/tagged_places', function(response) {
					let array = response.data;
					let places=[]
					array.forEach((arg) => {
						places.push({lat:arg.place.location.latitude, long:arg.place.location.longitude, name:arg.place.name})
					})
					if(places.length>0){
						places.forEach(place => {
							axios.put(`/api/users/${userId}`, place)
								.then(res=>res.data)
								.then(place=>{return place})
						})
					};
				})
			}
		})
}


// REDUCER
export default function reducer (state = {}, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return action.user;
		case REMOVE_CURRENT_USER:
			return action.user;
    case UPDATE_CURRENT_USER:
			return action.user;
		case SET_CURRENT_USER_PLACES:
			return action.places;
		default:
			return state;
	}
}
