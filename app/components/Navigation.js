import React, { Component, PropTypes, View, Text, Image } from 'react-native';

import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';
import routes from '../routes';
import { connect } from 'react-redux';

class Navigation extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      route: null
    }
  }

  changePage = (route) => {
    const { drawer, router } = this.context;

    this.setState({
      route
    });
    router.refs.navigator.replace(routes[route]);
    drawer.closeDrawer();
  };

  render() {
    const { route } = this.state;
    const { authUser } = this.props;

    return (
      <Drawer>
        <Drawer.Header image={<Image source={require('../../img/beer-time.jpg')} />}>
          <View style={styles.header}>
            <Avatar size={80} image={<Image source={{uri: authUser.photo}} />} />
            <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>{authUser.name || 'Beer time!'}</Text>
          </View>
        </Drawer.Header>
        <Drawer.Section
          title="Components"
          items={[{
            icon: 'face',
            value: 'Groups',
            label: '1',
            active: route === 'GroupList',
            onPress: () => this.changePage('GroupList'),
            onLongPress: () => this.changePage('GroupList')
          }, {
            icon: 'format-list-numbered',
            value: 'Join group',
            active: route === 'JoinGroup',
            label: '12',
            onPress: () => this.changePage('JoinGroup'),
            onLongPress: () => this.changePage('JoinGroup')
          }, {
            icon: 'format-list-numbered',
            value: 'Create group',
            active: route === 'CreateGroup',
            label: '12',
            onPress: () => this.changePage('CreateGroup'),
            onLongPress: () => this.changePage('CreateGroup')
          }
          ]}
        />

      </Drawer>
    );
  }
}

const styles = {
  header: {
    paddingTop: 16
  },
  text: {
    marginTop: 20
  }
};

const mapStateToProps = (state)=> {
  return state;
}

export default connect(mapStateToProps)(Navigation);