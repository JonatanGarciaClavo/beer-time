import Firebase from 'firebase';
import Promise from 'bluebird';

const BASE_URL = 'https://intense-heat-6423.firebaseio.com/';
const URL_USERS = BASE_URL + 'users/';
const URL_GROUPS = BASE_URL + 'groups/';

const _cleanKey = (key)=> {
	return key.replace(/[#\.$\[\]]/, ':');
};

let FirebaseServices = {
	existsUser(email) {
		let firebaseConnection = new Firebase(URL_USERS + _cleanKey(email));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (userDB)=> {
				return resolve(userDB.exists());
			}, (err)=> reject(err));
		});
	},

	addUser(user) {
		console.log('addUser url: ',URL_USERS + _cleanKey(user.email) );
		let firebaseConnection = new Firebase(URL_USERS + _cleanKey(user.email));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (userDB)=> {
				if (userDB.exists()) {
					return reject(`User with email $user.email already exists. Please login.`);
				}
				firebaseConnection.set(user, (err)=> {
					if (err) {
						return reject(err);
					}
					return resolve(user);
				});
			}, err=> reject(err));
		});
	},

	getUser(email) {
		console.log('getUser url: ',URL_USERS + _cleanKey(email) );
		let firebaseConnection = new Firebase(URL_USERS + _cleanKey(email));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (user)=> resolve(user.val()), (err)=> reject(err));
		});
	},

	addGroup(group) {
		let firebaseConnection = new Firebase(URL_GROUPS + _cleanKey(group.name));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (groupDB)=>{
				if (groupDB.exists()) {
					return reject('Group with name ' + group.name + ' already exists.');
				}
				firebaseConnection.set(group, (err)=> {
					if (err) {
						return reject(err);
					}
					return resolve(group);
				});
			}, err=> reject(err));
		});
	},

	getGroup(name) {
		let firebaseConnection = new Firebase(URL_GROUPS + _cleanKey(name));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (group)=> resolve(group.val()), (err)=> reject(err));
		});
	},

	addUserToGroup(name, pass, email) {
		let firebaseConnection = new Firebase(URL_GROUPS + _cleanKey(name));
		return new Promise((resolve, reject)=> {
			firebaseConnection.once('value', (groupDB)=> {
				if (groupDB.exists()){
					let group = groupDB.val();
					if (group.pass === pass) {
						group.users.push(email);
						firebaseConnection.set(group, (err)=> {
							if (err) {
								return reject(err);
							}
							let firebaseConnectionUser = new Firebase(URL_USERS + _cleanKey(email));
							firebaseConnectionUser.once('value', (userDB)=> {
								let user = userDB.val();
								user.groups.push(name);
								firebaseConnectionUser.set(user, (err)=> {
									if (err) {
										return reject(err);
									}
									return resolve(group, user.groups);
								});
							});
						});
					} else {
						return reject('Password group incorrect');
					}
				} else {
					return reject('Group is not exists.');
				}
			}, (err)=> reject(err));
		});
	},

	updateUserGroups(email, groups) {
		let firebaseConnection = new Firebase(URL_USERS + _cleanKey(email) + '/groups')
		return new Promise((resolve, reject)=> {
			firebaseConnection.set(groups, (err)=> {
				if (err) {
					return reject(err);
				}
				return resolve(groups);
			});
		});
	}

}

export default {
	...FirebaseServices
};