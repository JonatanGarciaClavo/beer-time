import React, { Component } from 'react-native';
import { Button, COLORS } from 'react-native-material-design';

class CardButtonAction extends Component {
	render() {
		return <Button primary='paperAmber' {...this.props} />
	}
}

export default CardButtonAction;