import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//screens
import HomeScreen from './Components/Screens/Home';
import AddBooksScreen from './Components/Screens/AddBooks';
import ViewBooksToReadScreen from './Components/Screens/ViewBooksToRead';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  AddBooks: {screen: AddBooksScreen},
  ViewBooksToRead: {screen: ViewBooksToReadScreen},
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
