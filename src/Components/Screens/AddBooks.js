import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Button from 'react-native-button';

class AddBooksScreen extends Component {
  static navigationOptions = {
    title: 'Add a book',
  };

  state = {
    title: '',
    author: '',
    status: 'notRead',
    books: [],
    isValid: false,
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  componentDidUpdate(prevState) {
    const {title, author, isValid} = this.state;
    console.log('titel', title, 'author', author);
    if (title.length > 0 && author.length > 0 && isValid === false) {
      this.setState(prevState => ({
        isValid: {...prevState.isValid, isValid: true},
      }));
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isValid} = this.state;
    return (
      <>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={val => this.onChangeText('title', val)}
            placeholder="What do you want to read?"
          />
          <TextInput
            style={styles.input}
            value={this.state.author}
            onChangeText={val => this.onChangeText('author', val)}
            placeholder="Who wrote it?"
          />
          <Button
            style={{fontSize: 20, color: 'white'}}
            containerStyle={{
              padding: 20,
              margin: 30,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: 'blue',
            }}
            onPress={() => alert('Success!')}
            styleDisabled={{color: 'white'}}
            disabledContainerStyle={{
              backgroundColor: 'lightgrey',
            }}
            disabled={!isValid}>
            Add Book
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  input: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    marginVertical: 10,
  },
});

export default AddBooksScreen;
