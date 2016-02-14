import React, { Component, DrawerLayoutAndroid, StyleSheet, Text } from 'react-native';
import Navigation from './Navigation';
import Router from 'react-native-simple-router';
import routes from '../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthUserActions } from '../actions';

class AppView extends Component {
	static childContextTypes = {
    drawer: React.PropTypes.object,
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      drawer: null,
      router: null
    };
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      router: this.state.router
    }
  };

  setDrawer = (drawer) => {
    this.setState({
      drawer
    });
  };

  setRouter = (router) => {
    this.setState({
      router
    });
  };

  render() {
    const { drawer, router } = this.state;
    const { isUserLogedIn } = this.props.actions;
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
              if (drawer && router) {
                return <Navigation/>;
              }
              return <Text>asdfasdf</Text>;
            }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
        >
        <Router
          firstRoute={routes.UserLogin}
          headerStyle={styles.routerHeader}
          titleStyle={styles.routerTitle}
          ref={(router) => { !this.state.router ? this.setRouter(router) : null }}
          />
      </DrawerLayoutAndroid>
    );
  };

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 56
  },
  routerHeader: {
    backgroundColor: '#FFC107',
  },
  routerTitle: {
    color: 'white'
  }
});

const mapStateToProps = (state)=> {
  return { authUser: state.authUser };
}

const mapActionsToProps = (dispatch)=> {
	return { actions: bindActionCreators(AuthUserActions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(AppView);

