import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Button from 'react-native-button';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome!</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                This is a place where you can keep track of books you want to
                read. Enter the title and author on the next screen. Once you
                get around to reading a book, make sure you mark it off as
                'read'.
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContaine}>
              <Button
                style={{fontSize: 20, color: 'white'}}
                containerStyle={{
                  padding: 20,
                  margin: 30,
                  overflow: 'hidden',
                  borderRadius: 4,
                  backgroundColor: 'blue',
                }}
                onPress={() => navigate('AddBooks')}>
                Next
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },

  highlight: {
    fontWeight: '700',
  },
});
export default HomeScreen;
