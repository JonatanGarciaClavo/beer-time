import { SUCCESS_SIGN_IN, SUCCESS_SIGN_OUT, ERROR_SIGN_IN } from '../constants/auth-user-actions-constants';
import { ADD_USER } from '../constants/user-actions-constants';
import { GoogleSignin } from 'react-native-google-signin';
import FirebaseServices from '../services/firebase-services';

const _initialiceUser = (dispatch, user)=> {
		if (!user.groups) {
			user.groups = [];
		}
		dispatch({
			type: ADD_USER,
			user
		});
		dispatch({
			type: SUCCESS_SIGN_IN,
			user
		});
}

let AuthUserActions = {
	isUserLogedIn() {
		return (dispatch, getState)=> {
			let state = getState();
			return state.authUser.isSignedIn;
		}
	},
	isCurrentUserLogged(email) {
		return (dispatch, getState)=> {
			let state = getState();
			return state.authUser.email === email;
		}
	},
	googleSignInUser() {
		return (dispatch)=> {
			GoogleSignin.signIn()
				.then((user) => {
				  console.log(user);
				  dispatch({
				  	type: SUCCESS_SIGN_IN,
				  	user
				  });
				})
				.catch((err) => {
				  console.log('WRONG SIGNIN', err);
				  dispatch({
				  	type: ERROR_SIGN_IN
				  })
				})
		};
	},
	facebookSignInUser(fbUser) {
		let user = {
			name: fbUser.profile.name,
			email: fbUser.profile.email,
			photo: fbUser.profile.picture.data.url,
			groups: []
		};
		return (dispatch)=> {
			FirebaseServices.existsUser(user.email)
				.then((existsUser)=> {
					if (existsUser) {
						return FirebaseServices.getUser(user.email)
							.then((userDB)=> {
								console.log('user', userDB);
								return _initialiceUser(dispatch, userDB);
							});
					}
					return FirebaseServices.addUser(user)
						.then((user)=>{
							return _initialiceUser(dispatch, user);
						});
				})
				.catch((err)=> console.error(err));
		}
	},
	facebookSignOutUser() {
		return (dispatch)=> {
			dispatch({
				type: SUCCESS_SIGN_OUT
			});
		}
	}
};

export default {
	...AuthUserActions
};