import React from 'react';

import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header';

const Repositories = () => (
  <View>
    <Header title="Repositórios" />
  </View>
);

Repositories.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="list-alt" size={20} color={tintColor} />
  ),
};

export default Repositories;
