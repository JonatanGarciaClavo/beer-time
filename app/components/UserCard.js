import React, { Component, PropTypes, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-material-design';
import { CardButtonAction } from './base';
import TotalDrinks from './TotalDrinks';
import UserInfo from './UserInfo';

class UserCard extends Component {
	render() {
		let { name, total } = this.props.user;
		return (
			<Card>
				<Card.Body>
					<View style={styles.bodyContainer}>
						<UserInfo name={name} />
						<TotalDrinks total={total} />
					</View>
				</Card.Body>
				{this.props.actionBar ?
				<Card.Actions>
					<CardButtonAction text='Soft Beer' onPress={()=> this.props.actions.addSoftBeer(this.props.user.id)} />
					<CardButtonAction text='Beer' onPress={()=> this.props.actions.addBeer(this.props.user.id)} />
					<CardButtonAction text='Shot' onPress={()=> this.props.actions.addShoot(this.props.user.id)} />
					<CardButtonAction text='Cocktail' onPress={()=> this.props.actions.addCoktail(this.props.user.id)} />
				</Card.Actions>
				:null}
			</Card>
		);
	}
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default UserCard;