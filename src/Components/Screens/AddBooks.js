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

const ListBooksToRead = `query ListBooKs(
  $filter: ModelBOOKFilterInput
  $limit: Int
  $nextToken: String
) {
  listBOOKs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      author
      status
    }
    nextToken
  }
}
`;

class AddBooksScreen extends Component {
  static navigationOptions = {
    title: 'Add a book',
  };

  state = {
    title: '',
    author: '',
    status: 'notRead',
    isValid: false,
    displayBooksToRead: false,
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

  async componentDidMount() {
    try {
      const books = await API.graphql(graphqlOperation(ListBooksToRead));
      const booksList = books.data.listBOOKs.items.length > 0 ? true : false;
      console.log('books:', booksList);
      if (booksList) {
        this.setState(prevState => ({
          displayBooksToRead: {
            ...prevState.displayBooksToRead,
            displayBooksToRead: true,
          },
        }));
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isValid, displayBooksToRead} = this.state;
    console.log('display:', displayBooksToRead);
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
            onPress={this.addBook}
            styleDisabled={{color: 'white'}}
            disabledContainerStyle={{
              backgroundColor: 'lightgrey',
            }}
            disabled={!isValid}>
            Add Book
          </Button>
          {displayBooksToRead && (
            <Button
              style={{fontSize: 20, color: 'white'}}
              containerStyle={{
                padding: 20,
                margin: 30,
                overflow: 'hidden',
                borderRadius: 4,
                backgroundColor: 'blue',
              }}
              onPress={() => navigate('ViewBooksToRead')}>
              Books To Read
            </Button>
          )}
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
