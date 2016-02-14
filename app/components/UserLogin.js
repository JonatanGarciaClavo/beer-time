import React, { Component, PropTypes, View, Text, Image, NativeModules } from 'react-native';
import { Card } from 'react-native-material-design'
import { GoogleSigninButton } from 'react-native-google-signin';
import FBLogin from 'react-native-facebook-login';
import routes from '../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthUserActions } from '../actions';
let FBLoginManager = NativeModules.FBLoginManager;

class UserLogin extends Component {

	componentWillMount() {
		console.log('actions', this.props.actions);
		let { facebookSignInUser } = this.props.actions;
    FBLoginManager.getCurrentToken((token)=> {
      if (token) {
      	FBLoginManager.loginWithPermissions(['email'], (err, data)=> {
      		if (data && data.profile) {
      			data.profile = JSON.parse(data.profile)
      			facebookSignInUser(data);
      		}
        });
      }
    });
  }

	componentDidUpdate() {
		let { isSignedIn } = this.props.authUser;
		if (isSignedIn) {
			this.props.resetToRoute(routes.GroupList);
		}
	}

	render() {
		let { googleSignInUser, facebookSignInUser, facebookSignOutUser} = this.props.actions;
		return (
			<Card>
				<Card.Media
					image={<Image source={require('../../img/beer-time.jpg')} />}
          overlay
         	/>
				<Card.Body>
					<Text style={{ marginTop: 10}}>Choose your favorite social network to login</Text>
     			<FBLogin style={{ marginTop: 10, marginBottom: 10, }}
		        permissions={["email"]}
		        onLogin={(data)=> {
		          console.log("Logged in!");
		          console.log(data);
		          facebookSignInUser(data);
		        }}
		        onLogout={()=> {
		          console.log("Logged out.");
		          facebookSignOutUser();
		        }}
		        onLoginFound={(data)=> {
		          console.log("Existing login found.");
		          console.log(data);
		          facebookSignInUser(data);
		        }}
		        onLoginNotFound={()=> {
		          console.log("No user logged in.");
		          facebookSignOutUser();
		        }}
		        onError={(data)=> {
		          console.log("ERROR");
		          console.log(data);
		          facebookSignOutUser();
		        }}
		        onCancel={()=> {
		          console.log("User cancelled.");
		          facebookSignOutUser();
		        }}
		        onPermissionsMissing={(data)=> {
		          console.log("Check permissions!");
		          console.log(data);
		          facebookSignOutUser();
		        }}
		      />
				</Card.Body>
			</Card>
		);
	}

}

const mapStateToProps = (state)=> {
  return { authUser: state.authUser };
}

const mapActionsToProps = (dispatch)=> {
	return { actions: bindActionCreators(AuthUserActions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(UserLogin);