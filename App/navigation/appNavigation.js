import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileNumberEntryScreen from '../screens/login/MobileNumberEntryScreen';
import OtpVerificationScreen from '../screens/login/OtpVerificationScreen';
import UserNameEntryScreen from '../screens/login/UserNameEntryScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PanCardScreen from '../screens/login/PanCardScreen';
import ServiceDeliveryScreen from '../screens/login/ServiceDeliveryScreen';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/login/LocationScreen';
import SearchCategoryScreen from '../screens/login/SearchCategoryScreen';
// import Modal from '../screens/login/ModalScreen';
import HistoryScreen from '../screens/history & preview/HistoryScreen';
import WriteAboutStoreScreen from '../screens/login/WriteAboutStoreScreen';
import ProfileScreen from '../screens/menu & profile/ProfileScreen';
import MenuScreen from '../screens/menu & profile/MenuScreen';
import StoreProfilePreview from '../screens/history & preview/StoreProfilePreview';
import ModalScreen from '../components/ModalScreen';
import CameraScreen from '../screens/utils/CameraScreen';
import AddImageScreen from '../screens/login/AddImageScreen';
import ImagePreview from '../screens/login/ImagePreview';
import RequestPage from '../screens/requests/RequestPage';
import ChatPage from '../screens/requests/ChatPage';
import BidPageInput from '../screens/requests/BidPageInput';
import BidPageImageUpload from '../screens/requests/BidPageImageUpload';
import BidOfferedPrice from '../screens/requests/BidOfferedPrice';
import BidPreviewPage from '../screens/requests/BidPreviewPage';
import MapScreen from '../screens/utils/MapScreen';
import AboutScreen from '../screens/menu & profile/AboutScreen';
import HelpScreen from '../screens/menu & profile/HelpScreen';
import BidQueryPage from '../screens/requests/BidQueryPage';
const Stack = createNativeStackNavigator();
const GlobalNavigation = () => {

    return (

        <Stack.Navigator
        initialRouteName="mobileNumber"
        screenOptions={{
          headerShown: false,
          animation:"slide_from_right",
          animationDuration:"50"
        }}
      >
        <Stack.Screen name="welcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="mobileNumber" component={MobileNumberEntryScreen} />
        <Stack.Screen name="otpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="registerUsername" component={UserNameEntryScreen} />
        <Stack.Screen name="panCard" component={PanCardScreen} />
        <Stack.Screen name="serviceDelivery" component={ServiceDeliveryScreen} />
        <Stack.Screen name="locationScreen" component={LocationScreen} />
        <Stack.Screen name="searchCategory" component={SearchCategoryScreen} />
        <Stack.Screen name="writeAboutStore" component={WriteAboutStoreScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="menu" component={MenuScreen} />
        <Stack.Screen name="profilePreview" component={StoreProfilePreview} />
        <Stack.Screen name="modal" component={ModalScreen} />
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="addImg" component={AddImageScreen} />
        <Stack.Screen name="imagePreview" component={ImagePreview} />
        <Stack.Screen name="requestPage" component={RequestPage} />
        <Stack.Screen name="chatPage" component={ChatPage} />
        <Stack.Screen name="bidPageInput" component={BidPageInput} />
        <Stack.Screen name="bidPageImageUpload" component={BidPageImageUpload} />
        <Stack.Screen name="bidOfferedPrice" component={BidOfferedPrice} />
        <Stack.Screen name="bidPreviewPage" component={BidPreviewPage} />
        <Stack.Screen name="bidQuery" component={BidQueryPage} />
        <Stack.Screen name="history" component={HistoryScreen} />


        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="about" component={AboutScreen} />
        <Stack.Screen name="help" component={HelpScreen} />
      </Stack.Navigator>
    )
}

export default GlobalNavigation;