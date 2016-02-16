import { ADD_USER, UPDATE_USER } from '../constants/user-actions-constants';
import { ADD_GROUP } from '../constants/groups-actions-constants';
import FirebaseServices from '../services/firebase-services';

let UserActions = {
	addUser(user) {
		return dispatch=> {
			dispatch({
				type: ADD_USER,
				user
			});
		}
	},
	joinGroup(name, pass) {
		return (dispatch, getState)=> {
			let { authUser } = getState();
			FirebaseServices.addUserToGroup(name, pass, authUser.email)
				.then((group, userGroups)=> {
					dispatch({
						type: UPDATE_USER,
						user: {email: authUser.email, groups: userGroups}
					});
					dispatch({
						type: ADD_GROUP,
						group
					});
				});
		}
	}
};

export default {
	...UserActions
};