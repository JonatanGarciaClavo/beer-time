import React, { Component, Text, TextInput } from 'react-native';
import { Card } from 'react-native-material-design';
import { CardButtonAction } from './base';
import { UserActions } from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class JoinGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Card>
				<Card.Body>
					<Text>Put name and password of group</Text>
					<TextInput
						onChangeText={(name)=> this.setState({name})}
						value={this.state.name}
					/>
					<TextInput
				    onChangeText={(pass) => this.setState({pass})}
				    value={this.state.pass}
				    secureTextEntry={true}
				  />
				</Card.Body>
				<Card.Actions>
					<CardButtonAction
						text='Join Group'
						onPress={()=> this.props.actions.joinGroup(this.state.name, this.state.pass)}
					/>
				</Card.Actions>
			</Card>
		);
	}
}

const mapStateToProps = (state)=> {
  return { users: state.users };
}

const mapActionsToProps = (dispatch)=> {
	console.log('UserActions', UserActions);
	return { actions: bindActionCreators(UserActions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(JoinGroup);