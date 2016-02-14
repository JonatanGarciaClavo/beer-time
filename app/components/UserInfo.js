import React, { Component, PropTypes, View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-material-design';

class UserInfo extends Component {
	render() {
		let { name } = this.props;
		return (
			<View style={styles.userInfoContainer}>
				<Avatar size={30} icon='local-bar' />
				<Text style={styles.name}>{name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	userInfoContainer: {
  	flex: 3,
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'center',
  	alignSelf: 'center'
  },
  name: {
  	marginLeft: 8
  }
});

export default UserInfo;