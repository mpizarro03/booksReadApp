import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import HomeScreen from './Components/Screens/Home';
import AddBooksScreen from './Components/Screens/AddBooks';
import ViewBooksToReadScreen from './Components/Screens/ViewBooksToRead';
import {Text, TouchableOpacity, View} from 'react-native';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  AddBooks: {
    screen: AddBooksScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewBooksToRead')}
          style={{paddingRight: 20}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>My List</Text>
        </TouchableOpacity>
      ),
    }),
  },
  ViewBooksToRead: {
    screen: ViewBooksToReadScreen,
  },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
