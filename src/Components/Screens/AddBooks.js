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
    this.setState({title: '', author: ''});
  };

  addBook = async () => {
    const {title, author} = this.state;
    const book = {title: title, author: author, status: 'notRead'};
    try {
      await API.graphql(graphqlOperation(AddBook, book));
      this.clearForm();
      console.log('success');
    } catch (err) {
      console.log('error:', err);
    }
  };

  isValid = () => {
    const valid =
      this.state.title &&
      this.state.title.length &&
      this.state.author &&
      this.state.author.length;
    return valid;
  };

  render() {
    this.isValid();
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
            disabled={!this.isValid()}>
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
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    marginVertical: 10,
    marginLeft: 20,
  },
});

export default AddBooksScreen;
