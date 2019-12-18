import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';

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
class ViewBooksToReadScreen extends Component {
  static navigationOptions = {
    title: 'Books to read',
  };
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const books = await API.graphql(graphqlOperation(ListBooksToRead));
      console.log('books', books);

      this.setState(prevState => ({
        books: {
          ...prevState.books,
          books: books.data.listBOOKs.items,
        },
      }));
    } catch (err) {
      console.log('error: ', err);
    }
    console.log('state is:', this.state.books);
  }
  render() {
    const booksList = this.state.books.books;
    console.log('state:', this.state.books.books);
    console.log('list:', booksList);
    return (
      <>
        <View style={styles.container}>
          <FlatList
            data={booksList}
            renderItem={({item}) => (
              <View>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.item}>by: {item.author}</Text>
              </View>
            )}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ViewBooksToReadScreen;
