import { View, Text,  Image, Pressable, ScrollView } from 'react-native'
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import AboutImg from "../../assets/AboutImg.svg"
import Time from "../../assets/aboutClock.svg"
import Wealth  from "../../assets/aboutWealth.svg"
import Health  from "../../assets/aboutHealth.svg"
import { SafeAreaView } from 'react-native-safe-area-context';
const AboutScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} className="relative">


                <View className="z-50 absolute top-[40px] left-[40px] py-[8px] px-[4px]">
                    <Pressable onPress={() => { navigation.goBack(); }} className="p-2">
                        <Image source={require('../../assets/arrow-left.png')} />
                    </Pressable>
                </View>



                <Text className="text-center pt-[40px] text-[16px] font-bold mb-[60px]">About Culturtap Genie</Text>

                

                <View className="flex flex-col justify-center items-center gap-[40px] px-[30px] mb-[100px]">
                   <View>
                    <AboutImg className=""/>
                   </View>
                   <View className="gap-[5px]">
                      <Text className="text-center text-[14px] font-bold">
                             Bargaining is the consumer's right, money doesn't grow on trees. 
                      </Text>
                      <Text className="text-center text-[14px] ">
                            Now bargaining is possible from your couch. Want anything new or to repair the old one, Connect with your nearby sellers and bargain for the best prices of products and services available in your city.
                      </Text>
                    </View>
                    <View className="gap-[5px] items-center">
                        <Text className="text-center text-[14px] font-bold">
                               Save Time
                        </Text>
                        <Time/>
                     
                        <Text className="text-center text-[14px] ">
                            Save your valuable time to search and explore best cost for any product and service
                        </Text>
                    </View>
                    <View className="gap-[5px] items-center">
                        <Text className="text-center text-[14px] font-bold">
                               Save Wealth
                        </Text>
                        <Wealth/>
                     
                        <Text className="text-center text-[14px] ">
                        You dont need to go out to buy any thing at first place, Collect bids from multiple sellers, 
                           you will save your fuel cost, even buy product at minimum available cost.
                        </Text>
                    </View>
                    <View className="gap-[5px] items-center">
                        <Text className="text-center text-[14px] font-bold">
                               Save Health
                        </Text>
                        <Health/>
                     
                        <Text className="text-center text-[14px] ">
                        Dont need to wander for any product and service anymore, keep your healthy routine continue. 
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutScreen;