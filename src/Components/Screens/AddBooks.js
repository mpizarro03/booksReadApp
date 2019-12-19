import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Button from 'react-native-button';
import API, {graphqlOperation} from '@aws-amplify/api';

const AddBook = `mutation ($title: String! $author: String $status: String!) {
  createBOOK(input: {
    title: $title
    author: $author
    status: $status
  }) {
    id title author status
  }
}
`;

class AddBooksScreen extends Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    title: '',
    author: '',
    status: 'notRead',
    isValid: false,
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  clearForm = () => {
    this.setState(prevState => ({
      title: {...prevState.title, title: ''},
      author: {...prevState.author, author: ''},
      isValid: {...prevState.isValid, isvalid: false},
    }));
  };

  addBook = async () => {
    const {title, author} = this.state;
    if (title === '' || author === ' ') return;
    const book = {title: title, author: author, status: 'notRead'};
    try {
      await API.graphql(graphqlOperation(AddBook, book));
      this.clearForm();
      console.log('success');
    } catch (err) {
      console.log('error:', err);
    }
  };

  componentDidUpdate(prevState) {
    const {title, author, isValid} = this.state;

    if (title.length > 0 && author.length > 0 && isValid === false) {
      this.setState(prevState => ({
        isValid: {...prevState.isValid, isValid: true},
      }));
    }
  }

  render() {
    const {isValid} = this.state;

    return (
      <>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={val => this.onChangeText('title', val)}
            placeholder="Book Title"
          />
          <TextInput
            style={styles.input}
            value={this.state.author}
            onChangeText={val => this.onChangeText('author', val)}
            placeholder="Author"
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
            onPress={this.addBook}
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
