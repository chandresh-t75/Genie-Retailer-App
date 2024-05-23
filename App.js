import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import GlobalNavigation from './App/navigation/appNavigation';
import './global.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import store from './App/redux/store';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';


export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect=(()=>{

    if(requestUserPermission()){
        messaging().getToken().then(token=>{
          console.log(token)
        })
    }
    else{
      console.log("permission not granted",authStatus)
    }

    messaging().getInitialNotification().then(async(remoteMessage)=>{
      if(remoteMessage){
        console.log("Notifications caused app to open from quit state",remoteMessage)
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage=>{
      console.log("Notification caused app to open from background state",remoteMessage)
    })


    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;

  },[])
  return (
    <Provider store={store}>
    <NavigationContainer >
      <GlobalNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
  );
}


