import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import EditIconWhite from "../../assets/editIconWhite.svg"
import EditIcon from "../../assets/editIcon.svg"





const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user,setUser]=useState();
    const route=useRoute()


    useEffect(() => {
        const { user } = route.params;
        setUser(user);
      }, [route.params]);
   

     console.log(user)

  return (
    <SafeAreaView>
        <ScrollView showsverticallScrollIndicator={false}>
         <View className="pt-[42px] flex ">
             <View className="flex flex-row px-[32px] items-center">
                 <View className="">
                     <Pressable onPress={() => {navigation.goBack()}} className="flex flex-row p-2 items-center  gap-2">
                                <FontAwesome name="arrow-left" size={15} color="black" />
                     </Pressable>
                    
                 </View>
                 <Text className="text-[16px] font-bold flex-1 flex text-center">Store Profile</Text>
             </View>
             <Text className="text-center mb-[20px]">{user?.storeName}</Text>

             <View className="flex items-center relative">
                <View>
                    {/* <Image source={require('../../assets/ProfileImg.png')} className="w-[132px] h-[132px] " /> */}
                    <Image source={{ uri: user?.storeImages[0] }} className="w-[130px] h-[130px] rounded-full" />
                    <View className="absolute right-[2px] bottom-[7px] w-[36px] h-[36px] bg-[#fb8c00] flex justify-center items-center rounded-full">
                    <EditIconWhite  className="px-[10px] "/>
                    </View>

                </View>

              </View>
              <View className="flex-row justify-between px-[32px] my-[10px]">
              <Text>Store Images</Text>
               <Pressable>
                <EditIcon className="px-[10px]"/>
                 </Pressable>
              </View>
            
                       
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {

                
                        user && user?.storeImages ?(
                      
                        <View className="pl-[32px] flex flex-row gap-[11px] mb-[60px]">

                               { user?.storeImages?.map((image, index) => ( // Start from index 1 to exclude the first image
                                <View key={index} className="rounded-[16px]">
                                        <Image
                                          source={{ uri: image }}
                                           width={119}
                                           height={164}
                                          className="rounded-[16px] border-[1px] border-[#cbcbce] object-contain"
                                   />
                               </View>))
                               }
                         </View>
                
                       
                        ):
                        (
                    <View className="pl-[32px] flex flex-row gap-[11px] mb-[60px]">
                        <View className="w-[119px] h-[164px] bg-[#F9F9F9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                         <View className="w-[119px] h-[164px] bg-[#f9f9f9] rounded-[16px] shadow-lg border-[1px] border-[#cbcbce]"></View>
                    </View>

                        )  
                }
                      
            </ScrollView>

             <View className="px-[32px] flex flex-col gap-[26px] mb-[20px]">
               
                   <View className="flex flex-col gap-[11px]">
                         <View className="flex flex-row justify-between">
                         <Text className="text-[14px] text-[#2e2c43]">Fetched Location</Text>
                         <Pressable onPress={()=>{console.log("refresh")}}>
                         <Text className="text-[14px] text-[#FB8C00] font-bold">Refresh</Text>
                         </Pressable>

                         </View>
                         <KeyboardAvoidingView>
                                 <View className="flex  items-center">
                                    <TextInput
                                         placeholder={user?.location}
                                        placeholderTextColor={"#81715D"}
                                        readOnly
                                        className="w-[330px] text-[14px]  px-[20px] py-[15px] bg-[#F9F9F9] font-semibold text-black rounded-[16px]"
                                        />
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Name</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={user?.storeName}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px]  font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Owner Name</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={user?.storeOwnerName}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px]  font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Store Category</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={user?.storeCategory}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px] font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         
                              <Text className="  text-[14px] font-normal">
                                 Mobile Number
                                </Text>
                                <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center gap-[10px] w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <View className="text-[16px] font-extrabold border-r-[1px] border-[#dbcdbb] flex flex-row gap-[9px] pr-[9px] items-center">
                                          <Text className="text-[16px] font-extrabold">+91</Text>
                                          <Entypo name="chevron-down" size={16} color="black" className="" />
                                        </View>
                                          <TextInput
                                                placeholder={user?.storeMobileNo}
                                                placeholderTextColor={"#dbcdbb"}
                                                keyboardType='numeric'
                                               
                                                className="text-[16px] font-semibold text-black"
                                                />
                                </View>
                          </KeyboardAvoidingView>
                         
                   </View>
                   <View className="flex flex-col gap-[11px]">
                         <Text className="text-[14px] text-[#2e2c43] ">Pan Card</Text>
                         <KeyboardAvoidingView className="flex items-center">
                                 <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
                                        <TextInput
                                         placeholder={user?.panCard}
                                        placeholderTextColor={"#dbcdbb"}
                                        
                                        className="w-[280px] text-[14px] font-semibold text-black "
                                        />
                                        <Pressable>
                                        <EditIcon className="px-[10px]"/>
                                        </Pressable>
                                </View>
                        </KeyboardAvoidingView>
                   </View>
                    
        
             </View>
         </View>
         </ScrollView>
      
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})