import React, { Component, PropTypes, ScrollView, Text } from 'react-native';
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { UserActions } from '../actions';

class Leaderboard extends Component {

	componentWillMount() {
		this.props.actions.orderByTotal();
	}

	getUserCardViews = ()=> {
		if (!this.props.users) {
			return null;
		}
		return this.props.users.map(user=> {
			return <UserCard key={user.id} user={user} actions={this.props.actions} />;
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
	return { actions: bindActionCreators(UserActions.actions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(Leaderboard);