import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import DPIcon from "../assets/DPIcon.svg";

const RetailerMessage = ({ bidDetails,user}) => {
    return (
        <View className="flex gap-[19px]   rounded-3xl w-[297px] border-[1px] border-gray-200 h-[max-content] py-[10px] items-center bg-[#ebebeb]">

            <View className="flex-row gap-[18px] py-[10px]">
                <View>
                    <Image
                        source={{ uri: user?.storeImages[0]}}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                </View>
                <View className="w-[60%]">
                    <Text className="text-[14px] text-[#2e2c43] font-bold">You</Text>
                    <Text className="text-[14px] text-[#2e2c43]">{bidDetails?.message}</Text>
                </View>
            </View>
            {/* <View className="flex-row gap-[4px]">
                <View className="h-[132px] w-[96px] rounded-3xl bg-white "></View>
                <View className="h-[132px] w-[96px] rounded-3xl bg-white"></View>

            </View>
            <View className="gap-[4px]">
                <View className="flex-row gap-[5px]">
                    <Text>Expected Price: </Text>
                    <Text className="font-bold text-[##79B649]">Rs. {bidDetails.bidPrice}</Text>


                </View>

                {bidDetails?.bidAccepted === "rejected" && (
                    <View className="flex-row items-center gap-1">
                        <Entypo name="circle-with-cross" size={20} color="#E76063" />
                        <Text className="text-[14px] text-[#E76063]">
                            Bid Rejected
                        </Text>
                    </View>
                )}
                {bidDetails?.bidAccepted === "accepted" && (
                    <View className="flex-row items-center gap-1">
                        <Tick width={18} height={18} />
                        <Text className="text-[14px] text-[#79B649]">
                            Bid Accepted
                        </Text>
                    </View>
                )}


            </View> */}
        </View>
    )
}

export default RetailerMessage

const styles = StyleSheet.create({})
