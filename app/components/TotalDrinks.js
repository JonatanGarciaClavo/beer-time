import React, { Component, PropTypes, View, Text, StyleSheet } from 'react-native';

class TotalDrinks extends Component {
	render() {
		return (
			<View style={styles.numberContainer}>
				<Text style={styles.number}>{this.props.total}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	numberContainer: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignSelf: 'center'
  },
  number: {
  	fontSize: 28
  }
});

export default TotalDrinks;