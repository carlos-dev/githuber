import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import createNavigator from './routes';

import './config/ReactotronConfig';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    const {userChecked, userLogged} = this.state;

    if (!userChecked) {
      return null;
    }

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
