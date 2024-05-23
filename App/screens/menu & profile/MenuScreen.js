import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Profile from "../../assets/ProfileIcon.svg"
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ModalLogout from '../../components/ModalLogout';




const MenuScreen = () => {
    const navigation = useNavigation();
    // const user=useSelector(state=>state.storeData.userDetails);
    const [user,setUser]=useState();
    const[modalVisible,setModalVisible]=useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user location from AsyncStorage
                const userData = JSON.parse(await AsyncStorage.getItem('userData'));

                console.log("profile",userData);
                if (userData) {
                        setUser(userData);
                        console.log("userprofile",user);
                }
            } catch (error) {
                console.error('Error fetching user location:', error)
            }
        }

        fetchUserData()
    }, [])

    const deleteUserData = async () => {
        setModalVisible(true);
        // 
    };

    
  return (
    <SafeAreaView style={{ flex: 1 }}>
       
         <View className="pt-[42px] flex  gap-[60px]" style={{ flex: 1 }} >
             <View className="flex flex-row px-[32px] items-center ">
                 <View className="">
                     <Pressable onPress={() => {navigation.goBack()}} className="flex flex-row p-2 items-center  gap-2">
                                <FontAwesome name="arrow-left" size={15} color="black" />
                     </Pressable>
                    
                 </View>
                 <Text className="text-[16px] font-bold flex-1 flex text-center">Menu</Text>
             </View>

            <Pressable onPress={()=>navigation.navigate("profile",{user})}>
                <View className="flex items-center">
                    <View className="flex flex-row gap-[32px] bg-white py-[48px] w-[90%] justify-center items-center rounded-md shadow-lg">
                    <Image source={{ uri: user?.storeImages[0] }} className="w-[36px] h-[36px] rounded-full" />
                        <View className="flex-col">
                            <Text className="text-[16px] font-bold text-center">{user?.storeOwnerName}</Text>
                            <Text className="text-[14px]">{user?.storeMobileNo}</Text>
                        </View>
                    </View>

                </View>
            </Pressable>

             <View className="px-[32px] flex flex-col gap-[40px]">
               
                    <Pressable onPress={()=>navigation.navigate("about")}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                               About CulturTap Genie 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </Pressable>
                    <Pressable >
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                          Terms & Conditions 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </Pressable>
                    <Pressable onPress={()=>navigation.navigate("help")}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                        Need any Help ? 
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </Pressable>

                    <Pressable onPress={deleteUserData}>
                        <View className="flex flex-row justify-between items-center">
                        <Text className="text-[15px]">
                        Log Out
                        </Text>
                        <FontAwesome6 name="arrow-right" size={15} color="black" />

                        </View>
                    </Pressable>
                    
        
             </View>
             
             <View className="absolute flex justify-center items-center">
            
          <ModalLogout
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            
          />
          
        </View>
        {modalVisible && (
                    <View style={styles.overlay} />
                )}
         </View>
      
    </SafeAreaView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent greyish background
    },
    // menuContainer: {
    //     flex: 1,
    //     // Add other styles for menu container
    // },
})