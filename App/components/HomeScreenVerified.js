import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNewRequests, setOngoingRequests } from '../redux/reducers/requestDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import NewRequests from './NewRequests';
import OngoingRequests from './OngoingRequests';
import HomeScreenRequests from './HomeScreenRequests';

const HomeScreenVerified = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [request, setRequest] = useState(true);
  const [tab, setTab] = useState("New");
  const [newRequest, setNewRequestLocal] = useState();
  const [ongoingRequest, setOngoingRequestLocal] = useState();

  useEffect(() => {
    fetchNewRequests();
    fetchOngoingRequests();
  }, []);

  const fetchNewRequests = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      const response = await axios.get(`https://genie-backend-meg1.onrender.com/chat/retailer-new-spades?id=${userData?._id}`);
      dispatch(setNewRequests(response.data));
      setRequest(true);
    } catch (error) {
    //   console.error('Error fetching new requests:', error);
    }
  };

  const fetchOngoingRequests = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      const ongoingresponse = await axios.get(`https://genie-backend-meg1.onrender.com/chat/retailer-ongoing-spades?id=${userData?._id}`);
      dispatch(setOngoingRequests(ongoingresponse.data));
      setRequest(true);
    } catch (error) {
    //   console.error('Error fetching ongoing requests:', error);
    }
  };

  const newRequests = useSelector(state => state.requestData.newRequests);
  const ongoingRequests = useSelector(state => state.requestData.ongoingRequests);

  const handleRefresh = async () => {
    setRefreshing(true); // Show the refresh indicator
  
    try {
      // Fetch new data from the server
      await fetchNewRequests();
      await fetchOngoingRequests();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    setRefreshing(false); // Hide the refresh indicator
  };
  

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
        <View className="flex items-center">
          <View>
            <View className="flex-row justify-between px-[20px] py-[10px] gap-[5x]">
              <Pressable onPress={() => setTab('New')}>
                <View className="flex-row  gap-[5px]  items-center p-[4px]">
                  <Text style={{ fontWeight: tab === 'New' ? 'bold' : 'normal', borderBottomWidth: tab === 'New' ? 3 : 0, borderBottomColor: "#FB8C00" }}>
                    New Requests
                  </Text>
                  <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                    <Text className="text-white  ">{newRequests ? newRequests.length : 0}</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => setTab('Ongoing')}>
                <View className="flex-row gap-[5px] items-center p-[4px]">
                  <Text style={{ fontWeight: tab === 'Ongoing' ? 'bold' : 'normal', borderBottomWidth: tab === 'Ongoing' ? 3 : 0, borderBottomColor: "#FB8C00" }}>
                    Ongoing Requests
                  </Text>
                  <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                    <Text className="text-white  ">{ongoingRequests ? ongoingRequests.length : 0}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
            {tab === 'New' && <NewRequests newRequests={newRequests} />}
            {tab === 'Ongoing' && <OngoingRequests ongoingRequests={ongoingRequests} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreenVerified;
