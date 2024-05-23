import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductOrderCard from "./ProductOrderCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const NewRequests = ({ newRequests }) => {
  const navigation = useNavigation();
  console.log("new", newRequests);
  return (
    <SafeAreaView className="flex-1">
      {/* <Text className="text-[14px] text-center mb-[20px]">Your ongoing requests</Text> */}
      <View className=" flex flex-col gap-[22px] mb-[20px] items-center justify-center">
        {newRequests && newRequests.length > 0 ? (
          newRequests.map((product) => (
            <Pressable
              key={product._id}
              onPress={() => {
                navigation.navigate("requestPage", { data: product });
              }}
            >
              <ProductOrderCard key={product._id} product={product} />
            </Pressable>
          ))
        ) : (
          <Text className="text-[14px] text-center mb-[20px]">
            No New Requests
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewRequests;

const styles = StyleSheet.create({});
