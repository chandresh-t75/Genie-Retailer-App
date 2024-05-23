import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductOrderCard from './ProductOrderCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const OngoingRequests = ({ongoingRequests}) => {
  const navigation=useNavigation();
  return (
    <SafeAreaView className="flex-1">
        
            {/* <Text className="text-[14px] text-center mb-[20px]">Your ongoing requests</Text> */}
                <View className=" flex flex-col gap-[22px] mb-[20px] items-center justify-center">

                {
                      ongoingRequests && ongoingRequests.length>0 ?(
                    ongoingRequests?.map((product)=>(
                      <Pressable key={product._id} onPress={()=>{navigation.navigate("requestPage",{data:product})}}>
                      
                         <ProductOrderCard key={product._id} product={product}/>
                      </Pressable>
                    ))
                  ):(
                    <Text className="text-[14px] text-center mb-[20px]">No Ongoing Requests</Text>
                  )
                  }
                </View>
    

    </SafeAreaView>
  )
}

export default OngoingRequests

const styles = StyleSheet.create({})