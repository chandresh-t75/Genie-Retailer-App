
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setStoreCategory } from '../../redux/reducers/storeDataSlice';

const searchData = [
  { id: 1, name: 'others' },
  { id: 2, name: 'Spare Parts' },
  { id: 3, name: 'Mobile Repair' },
  { id: 4, name: 'Electronics & Electrical Items' },
  { id: 5, name: 'others' },
  { id: 6, name: 'Spare Parts' },
  { id: 7, name: 'Mobile Repair' },
  { id: 8, name: 'Electronics & Electrical Items' },
  { id: 9, name: 'others' },
  { id: 10, name: 'Spare Parts' },
  { id: 11, name: 'Spare Parts' },
  { id: 12, name: 'Mobile Repair' },
  { id: 13, name: 'Electronics & Electrical Items' },
  { id: 14, name: 'others' },
  { id: 15, name: 'Spare Parts' },
  { id: 16, name: 'Mobile Repair' },
  { id: 17, name: 'Electronics & Electrical Items' },
];

const SearchCategoryScreen = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(searchData);
 

  const [selectedOption, setSelectedOption] = useState("");

const handleSelectResult = (result) => {
  setSelectedOption(result=== selectedOption ? null : result);
};

  const search = (text) => {
    const filteredResults = searchData.filter(
      (item) => item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleTextChange = (text) => {
    setSearchQuery(text);
    search(text);
  };

  const handleStoreCategory=()=>{
    try {
       
         dispatch(setStoreCategory(selectedOption.name));
         navigation.navigate('serviceDelivery');
      } catch (error) {
        
         console.log("error",error);
      }
}

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      <View  className="flex-1 w-full bg-white flex-col  gap-[40px] px-[32px] ">
      <ScrollView  className="flex-1 px-0 mb-[63px] " showsVerticalScrollIndicator={false} >

        <View className=" flex z-40 flex-row items-center mt-[50px] mb-[24px]">
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton} >
            <FontAwesome name="arrow-left" size={15} color="black" />
          </Pressable>
          <Text className="flex flex-1 justify-center items-center text-center text-[16px]">Select Category</Text>
        </View>
        <View className="flex flex-row gap-2 h-[60px]  border-[1px] items-center border-[#000000] rounded-[24px] mb-[50px]">
          <Octicons name="search" size={19} className="pl-[20px]" />
          <TextInput
            placeholder="Search here......."
            placeholderTextColor="#DBCDBB"
            value={searchQuery}
            onChangeText={handleTextChange}
            className="flex  text-center text-[14px] italic flex-1"
          />
        </View>
          <View  className="px-[10px]">
            {searchResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                onPress={() => handleSelectResult(result)}
              >
                <View  className="flex flex-row items-start py-[8px] gap-[24px]">
                  <View  className={`w-[16px] h-[16px] border-[1px] border-[#fd8c00] items-center ${result.id === selectedOption.id ? 'bg-[#fd8c00]' : ''}`}>
                  {result.id === selectedOption.id && <Octicons name="check" size={12} color="white" />}
                  </View>
                  <Text>{result.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
       
        <TouchableOpacity style={styles.nextButton} disabled={!selectedOption} onPress={handleStoreCategory}>
          <View style={styles.nextButtonInner}>
            <Text style={styles.nextButtonText}>NEXT</Text>
          </View>
        </TouchableOpacity>
 </View>
      
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    //  marginTop: Platform.OS === 'android' ? 44 : 0, 
    backgroundColor: 'white',
  },
 
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fb8c00',
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default SearchCategoryScreen;
