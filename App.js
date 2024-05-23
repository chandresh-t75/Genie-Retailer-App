import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import GlobalNavigation from './App/navigation/appNavigation';
import './global.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import store from './App/redux/store';
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer >
      <GlobalNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
  );
}


