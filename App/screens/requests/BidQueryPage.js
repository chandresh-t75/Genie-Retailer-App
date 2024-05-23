import { View, Text, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThreeDots from '../../assets/ThreeDotIcon.svg';
import { FontAwesome } from '@expo/vector-icons';

import Copy from '../../assets/Copy.svg';
import Document from '../../assets/Document.svg';
import Send from '../../assets/Send.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from "../../assets/ProfileIcon.svg";
import ChatMessage from '../../components/ChatMessage';
import ReplyMessage from '../../components/ReplyMessage';
import axios from 'axios';
import { socket } from '../utils/socket.io/socket';

const BidQueryPage = () => {
    const route=useRoute();
    const navigation = useNavigation();
    
    const [query,setQuery]=useState("");
    const messages=route.params.messages;
    const user=route.params.user;
    const requestInfo=route.params.requestInfo;


    // useEffect(() => {
    //     if (route.params) {
    //         setUser(route.params.user);
    //         setRequestInfo(route.params?.requestInfo);
    //         //         // console.log('images', images);
    //         //         // console.log('route.params.data', route.params.data);
    //     }
    // }, [route.params])

    const sendQuery=async()=>{
        try {
            console.log("query",query,requestInfo._id);
            // if(messages?.length===1){
            //     console.log("firstmessage",messages[0]);
            //     const res = await axios.patch(
            //         `https://genie-backend-meg1.onrender.com/chat/modify-spade-retailer?id=${requestInfo?._id}`
            //       );
            //       // console.log("res after update", res);
            
            //       console.log("resafterupdate", res);
              
            // }

            

            const response = await axios.post('https://genie-backend-meg1.onrender.com/chat/send-message',{
            sender: {
                type: "Retailer",
                refId: user?._id
            },
            message:query,
            bidType:"false",
            warranty:0,
            bidPrice:0,
            bidImaages:[],
            chat:requestInfo?._id
              });
           console.log("res",response);
           if(response.status===201){
             console.log("messages recieved",response.data);
             setQuery("");
             socket.emit('new message',response.data);
             navigation.navigate("requestPage",{data:requestInfo})

           }
           else{
            console.error("Error updating message:");
           }
          
        } catch (error) {
            console.log("error sending message",error);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
           
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative flex-grow bg-[#ffe7c8]">
                        <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[30px]">
                            <Pressable onPress={() => { navigation.goBack(); }}>
                                <FontAwesome name="arrow-left" size={15} color="black" />
                            </Pressable>

                            <View className="gap-[9px]">
                                <View className="flex-row gap-[18px]">
                                    <View className="bg-[#F9F9F9] p-2 rounded-full">
                                        <Profile className="" />
                                    </View>
                                    <View className="w-[70%]">
                                        <Text className="text-[14px] text-[#2e2c43]">{user?.storeName}</Text>
                                        <Text className="text-[12px] text-[#c4c4c4]">Active 3 hr ago</Text>
                                    </View>
                                </View>
                               
                            </View>

                            {/* <Pressable onPress={() => { console.log("hii") }}>
                                <ThreeDots />
                            </Pressable> */}
                        </View>
                        <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
                        <View className="flex-row gap-[10px] items-center">
                                    <Text className="text-[16px] font-bold">Request Id</Text>
                                    <Text>{requestInfo?.requestId?._id}</Text>
                                </View>
                                <Text className="">{requestInfo?.requestId?.requestDescription} ...</Text>
                        </View>
                        <KeyboardAvoidingView>
                        <View className="flex gap-[21px] px-[50px] pt-[10px] pb-[100px]">
                      
                        <View className="flex-row justify-between">
                            <Text className="font-bold">Send a Query</Text>
                            {/* <Text>Step 1/3</Text> */}
                        </View>
                        <Text>
                              Type your response here to the customer
                        </Text>
                        <View className="bg-white p-4 rounded-lg">
                        <TextInput
                            multiline
                            numberOfLines={5}
                            placeholder='Start typing here'
                            placeholderTextColor="#dbcdbb"
                            classname=" "
                            onChangeText={(text) => setQuery(text)}

                        />
                        </View>
                       
                        </View>
                        </KeyboardAvoidingView>

                        {/* Spacer View */}
                        <View style={{ flex: 1 }} />
                    </View>
                </ScrollView>

                {/* Typing Area */}
                <View className="absolute bottom-0 left-0 right-0">
                    
                    <View className="gap-[20px]">
                       
                       <TouchableOpacity onPress={sendQuery}>
                        <View className="h-[63px] flex items-center justify-center  bg-[#FB8C00] ">
                         <Text className="font-bold text-[16px] text-white">Next</Text>
                         </View>
                       </TouchableOpacity>
                    </View>
                </View>
         
        </SafeAreaView>
    );
}

export default BidQueryPage;
