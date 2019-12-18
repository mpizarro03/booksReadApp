/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Amplify from '@aws-amplify/core';
import awsmobile from '../aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

//configure auth, having issues importing material icons, issue w/ linking
// Amplify.configure(awsmobile);
// const signUpConfig = {
//   header: 'Welcome to Books to Read App',
//   hideAllDefaults: true,
//   defaultCountryCode: '1',
//   signUpFields: [
//     {
//       label: 'Enter user name',
//       key: 'username',
//       required: true,
//       displayOrder: 1,
//       type: 'string',
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       displayOrder: 2,
//       type: 'password',
//     },
//     {
//       label: 'Email',
//       key: 'email',
//       required: true,
//       displayOrder: 4,
//       type: 'string',
//     },
//   ],
// };
// const usernameAttributes = 'User Name';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Book App</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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

// export default withAuthenticator(App, {signUpConfig, usernameAttributes});
export default App;
