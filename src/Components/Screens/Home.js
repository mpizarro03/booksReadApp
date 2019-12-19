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
        <SafeAreaView style={styles.Container}>
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Welcome to Books List!</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionParagraph}>
              Books List is a space where you keep track of books you want to
              read.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionParagraph}>
              Enter the title and author on the next screen.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionParagraph}>
              After you've read your book, make sure to mark it off as Read.
            </Text>
          </View>
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
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  cContainer: {
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  headerSection: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  section: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  sectionParagraph: {
    fontSize: 18,
    fontWeight: '400',
  },
});
export default HomeScreen;
