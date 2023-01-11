import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";

import Home from './src/Home';
import Note from './src/Note';
import About from './src/About';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/redux/store';

const stackNav = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor} >
          <NavigationContainer>
            <stackNav.Navigator initialRouteName='Home'>
              <stackNav.Screen name="Home" component={Home} options={{headerShown:false}} />
              <stackNav.Screen name="Note" component={Note} />
              <stackNav.Screen name="About" component={About} />
            </stackNav.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
