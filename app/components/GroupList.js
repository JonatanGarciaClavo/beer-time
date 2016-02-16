import React, { Component, Text, View } from 'react-native';
import { Card, Drawer } from 'react-native-material-design';
import { CardButtonAction } from './base';
import { GroupsActions } from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import routes from '../routes';

class GroupList extends Component {

	componentWillMount() {
		this.props.actions.getGroupsFromCurrentUser();
	}

	render() {
		let { groups } = this.props;
		if (groups.length === 0) {
			return (
				<Card>
					<Card.Body>
						<Text>You are not joined to any group yet</Text>
					</Card.Body>
					<Card.Actions>
						<CardButtonAction
							text='Join Group'
							onPress={()=> this.props.replaceRoute(routes.JoinGroup)}
						/>
						<CardButtonAction
							text='Create Group'
							onPress={()=> this.props.replaceRoute(routes.CreateGroup)}
						/>
					</Card.Actions>
				</Card>
			);
		}
		return (
			<Drawer>
				<Drawer.Section
					title='Groups'
					items={
						_.map(groups, (group)=> {
							return {
								icon: 'group',
								value: group.name,
								label: '' + group.users.length
							};
						})
					}
				/>
			</Drawer>
		);
	}
};

const mapStateToProps = (state)=> {
  return { groups: state.groups };
}

const mapActionsToProps = (dispatch)=> {
	return { actions: bindActionCreators(GroupsActions, dispatch) };
}


export default connect(mapStateToProps, mapActionsToProps)(GroupList);