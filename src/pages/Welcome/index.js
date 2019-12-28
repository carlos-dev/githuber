import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

export default class Welcome extends Component {
  state = {
    username: '',
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

    navigation.navigate('Repositories');
    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      console.tron.log(this.props.navigation);
    } catch (error) {
      console.tron.log(error);
    }
  };

  render() {
    const {username} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#444a5a" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>insira seu nome de usuário no github</Text>

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
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
