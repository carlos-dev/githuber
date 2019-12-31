import React, {Component} from 'react';
import {View, AsyncStorage, ActivityIndicator, FlatList} from 'react-native';

import api from '../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header';
import RepositoryItem from './RepositoryItem';

import styles from './styles';

export default class Repositories extends Component {
  state = {
    data: [],
    loading: true,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');
    const {data} = await api.get(`/users/${username}/repos`);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({data, loading: false});
  }

  renderListItem = ({item}) => <RepositoryItem repository={item} />;

  renderList = () => {
    const {data} = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Repositories.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="list-alt" size={20} color={tintColor} />
  ),
};
