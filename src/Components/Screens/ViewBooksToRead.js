import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import API, {graphqlOperation} from '@aws-amplify/api';
import Button from 'react-native-button';

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

const UpdateBook = `mutation ($title: String! $author: String $status: String! $id: ID!) {
  updateBOOK(
    input: {
      title: $title
      author: $author
      status: $status
      id: $id
    }) {
      id
      status
      title
      author
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
      this.setState({books: books.data.listBOOKs.items});
    } catch (err) {
      console.log('error: ', err);
    }
  }

  toggleRead = async item => {
    const {title, author, id, status} = item;
    let bookStatus;
    if (status === 'read') {
      bookStatus = 'notRead';
    } else bookStatus = 'read';
    const book = {id, status: bookStatus, title, author};
    try {
      const updatedBook = await API.graphql(graphqlOperation(UpdateBook, book));
      const updatedBooks = this.state.books.map(x => {
        if (x.id === updatedBook.data.updateBOOK.id) {
          x.status = updatedBook.data.updateBOOK.status;
        }
        return x;
      });
      this.setState({books: updatedBooks});
    } catch (err) {
      console.log('error:', err);
    }
  };
  render() {
    const booksList = this.state.books;
    console.log('booksList', booksList);
    return (
      <>
        <View style={styles.container}>
          <FlatList
            style={styles.body}
            data={booksList}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <View style={styles.cardContent}>
                  <Text style={styles.item}>{item.title}</Text>
                  <Text style={styles.item}>By {item.author}</Text>
                </View>
                <View style={styles.cardAction}>
                  <Button
                    style={
                      item.status === 'read'
                        ? styles.buttonTextRead
                        : styles.buttonTextUnread
                    }
                    containerStyle={
                      item.status === 'read'
                        ? styles.buttonContainerRead
                        : styles.buttonContainerUnread
                    }
                    onPress={() => this.toggleRead(item)}>
                    {item.status === 'read' ? 'Read' : 'Unread'}
                  </Button>
                </View>
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
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  cardContent: {
    flex: 3,
    flexWrap: 'wrap',
    padding: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  cardAction: {
    flex: 1,
  },
  item: {
    color: 'black',
    padding: 10,
    fontSize: 18,
  },
  buttonTextRead: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainerRead: {
    padding: 5,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'green',
  },
  buttonTextUnread: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainerUnread: {
    padding: 5,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'blue',
  },
});

export default ViewBooksToReadScreen;
