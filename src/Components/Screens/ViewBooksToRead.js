import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

class ViewBooksToReadScreen extends Component {
  static navigationOptions = {
    title: 'Books to read',
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  Your list of books to read:
                </Text>
              </View>
            </View>
          </ScrollView>
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
export default ViewBooksToReadScreen;
