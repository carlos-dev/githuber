import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  saveUser = async username => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const {username} = this.state;
    const {navigation} = this.props;

    this.setState({loading: true});

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('User');
    } catch (error) {
      this.setState({loading: false, error: true});
      console.tron.log(error);
    }
  };

  render() {
    const {username, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#444a5a" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>insira seu nome de usuário no github</Text>

        {error && <Text style={styles.error}>Usuário inexistente</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({username: text})}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
