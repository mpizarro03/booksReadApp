import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
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
    title: 'Books List',
  };
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const books = await API.graphql(graphqlOperation(ListBooksToRead));
      this.setState(prevState => ({
        books: {
          ...prevState.books,
          books: books.data.listBOOKs.items,
        },
      }));
    } catch (err) {
      console.log('error: ', err);
    }
  }
  render() {
    const booksList = this.state.books.books;
    return (
      <>
        <View style={styles.container}>
          <FlatList
            style={styles.body}
            data={booksList}
            renderItem={({item}) => (
              <View style={styles.listItemCard}>
                <Text style={styles.item}>Title: {item.title}</Text>
                <Text style={styles.item}>By: {item.author}</Text>
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
    flexDirection: 'row',
    paddingTop: 10,
  },
  body: {
    padding: 20,
  },
  listItemCard: {
    flexDirection: 'column',
    height: 90,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  item: {
    color: 'black',
    padding: 10,
    fontSize: 18,
    height: 30,
  },
});

export default ViewBooksToReadScreen;
