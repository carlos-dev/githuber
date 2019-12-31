import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import {View, Text} from 'react-native';

import Header from '../../components/header';

const Organizations = () => (
  <View>
    <Header title="Organizações" />
  </View>
);

Organizations.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="building" size={20} color={tintColor} />
  ),
};

export default Organizations;
