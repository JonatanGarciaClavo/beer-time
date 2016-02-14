import React, { Component, PropTypes, ScrollView, Text } from 'react-native';
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { UserActions, AuthUserActions } from '../actions';
import _ from 'lodash';

class UserList extends Component {

	getUserCardViews = ()=> {
		let { users, actions } = this.props;
		if (!users) {
			return null;
		}
		return _.map(users, user=> {
			return <UserCard actionBar={actions.isCurrentUserLogged(user.email)} key={user.email} user={user} actions={actions} />;
		});
	};

	render() {
		return (
			<ScrollView>
				{this.getUserCardViews()}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state)=> {
  return { users: state.users };
}

const mapActionsToProps = (dispatch)=> {
	console.log('UserActions', UserActions);
	return { actions: bindActionCreators(Object.assign({}, UserActions, AuthUserActions), dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(UserList);