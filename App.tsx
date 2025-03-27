import 'react-native-gesture-handler'
import React from 'react';
import {
  LogBox,
  Platform,
  StatusBar,
  TextInput,
  Text
} from 'react-native';
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { persistor, store } from './store/index'
import appColors from './utils/appColors';
import { isReadyRef, navigationRef } from './navigation/RootNavigation';
import NavigationStack from './navigation';

LogBox.ignoreAllLogs(true)

if (Platform.OS === "android") {
  StatusBar.setBarStyle("dark-content")
  StatusBar.setBackgroundColor(appColors.white)
}

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                //@ts-ignore
                isReadyRef.current = true;
              }}>
              <NavigationStack />
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
        <FlashMessage position="top" floating={true} />
      </PersistGate>
    </Provider>
  );
}

export default App;
