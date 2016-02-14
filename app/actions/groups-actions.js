import { ADD_GROUPS, ADD_GROUP } from '../constants/groups-actions-constants';
import { UPDATE_USER } from '../constants/user-actions-constants';
import FirebaseServices from '../services/firebase-services';
import Promise from 'bluebird';
import _ from 'lodash';

let GroupsActions = {
	getGroupsFromCurrentUser() {
		return (dispatch, getState)=> {
			let { authUser, users } = getState();
			let currentUser = _.find(users, {email: authUser.email});
			if (currentUser) {
				return Promise.map(currentUser.groups,(name)=>{
					return FirebaseServices.getGroup(name);
				})
					.then((groups)=> {
						console.log(groups);
						return dispatch({
							type: ADD_GROUPS,
							groups
						});
					});
			}
		}
	},
	createGroup(group) {
		return (dispatch, getState)=> {
			let { authUser, users } = getState();
			let currentUser = _.find(users, {email: authUser.email});
			group.users = [authUser.email];
			return FirebaseServices.addGroup(group).then((groupSaved)=> {
				currentUser.groups.push(group.name);
				return FirebaseServices.updateUserGroups(authUser.email, currentUser.groups)
					.then((userGroups)=>{
						dispatch({
							type: ADD_GROUP,
							group: groupSaved
						});
						dispatch({
							type: UPDATE_USER,
							user: {email: authUser.email, groups: userGroups}
						});
					});
			})
			.catch((err)=> console.error(err));
		}
}
};

export default {
	...GroupsActions
};