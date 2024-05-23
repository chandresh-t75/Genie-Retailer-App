import React, { useState, useEffect } from 'react';
import { View, Button, Text, Pressable, ScrollView ,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ClickImage from '../../assets/ClickImg.svg';
import AddMoreImage from '../../assets/AddMoreImg.svg';

const CameraScreen = () => {
    const [images, setImages] = useState([]);
    const navigation = useNavigation();
 
    const [cameraScreen, setCameraScreen] = useState(false);
    const [addMore, setAddMore] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, [cameraScreen]);

    const takePicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setImages(prevImages => [...prevImages, photo.uri]);
            setCameraScreen(false);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImages(prevImages => [...prevImages, result.assets[0].uri]);
        }
    };

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            {!cameraScreen && (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        
                    </View>
                </SafeAreaView>
            )}
           
        </>
    );
};

export default CameraScreen;
