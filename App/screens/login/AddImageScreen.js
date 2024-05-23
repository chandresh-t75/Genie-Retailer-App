import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ClickImage from "../../assets/ClickImg.svg";
import AddMoreImage from "../../assets/AddMoreImg.svg";
import {
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setImages } from "../../redux/reducers/storeDataSlice";
import ModalCancel from "../../components/ModalCancel";
import { manipulateAsync } from "expo-image-manipulator";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

const AddImageScreen = () => {
  const [imagesLocal, setImagesLocal] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [cameraScreen, setCameraScreen] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const [imgIndex, setImgIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState(
    Camera.Constants.WhiteBalance.auto
  );
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scaleAnimation] = useState(new Animated.Value(0));

  const handleImagePress = (image) => {
    setSelectedImage(image);
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [cameraScreen]);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.5,
      });

      const compressedImage = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 800, height: 800 } }],
        { compress: 0.5, format: "jpeg", base64: true }
      );

      await getImageUrl(compressedImage);
    }
  };

  const getImageUrl = async (image) => {
    setLoading(true);
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/kumarvivek/image/upload";
    const base64Img = `data:image/jpg;base64,${image.base64}`;
    const data = {
      file: base64Img,
      upload_preset: "CulturTap",
      quality: 50,
    };

    try {
      const response = await fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();
      if (result.secure_url) {
        setImagesLocal((prevImages) => [...prevImages, result.secure_url]);
        dispatch(setImages(result.secure_url));

        setCameraScreen(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const deleteImage = (index) => {
    setImgIndex(index);
    setModalVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      await getImageUrl(result.assets[0]);
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
            <View className="w-full z-40 pt-16 flex flex-row justify-between items-center px-[32px]">
              <Pressable
                onPress={() => navigation.goBack()}
                className="flex p-2 flex-row items-center gap-2"
              >
                <FontAwesome name="arrow-left" size={15} color="black" />
              </Pressable>
              <Text className="flex flex-1 justify-center items-center text-center text-[16px]">
                Add Image
              </Text>
            </View>
            <View className="mt-[26px] mb-[27px]">
              <Text className="text-[14px] text-center text-[#2e2c43]">
                Provide image references for sellers & service providers to
                understand your need better
              </Text>
            </View>

            {imagesLocal.length === 0 ? (
              <View className="z-0">
                <Pressable onPress={() => setCameraScreen(true)}>
                  <View className="flex-row justify-center">
                    <ClickImage />
                  </View>
                </Pressable>
                <Pressable onPress={pickImage}>
                  <View className="mx-[28px] mt-[30px] h-[63px] flex-row items-center justify-center border-2 border-[#fb8c00] rounded-3xl">
                    <Text className="text-[16px] font-bold text-[#fb8c00] text-center">
                      Browse Image
                    </Text>
                  </View>
                </Pressable>
              </View>
            ) : (
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.container}>
                    <View style={styles.imageContainer}>
                      {imagesLocal.map((image, index) => (
                        <Pressable
                          key={index}
                          onPress={() => handleImagePress(image)}
                        >
                          <View style={styles.imageWrapper}>
                            <Image
                              source={{ uri: image }}
                              style={styles.image}
                            />
                            <Pressable
                              onPress={() => deleteImage(index)}
                              style={styles.deleteIcon}
                            >
                              <Entypo
                                name="circle-with-cross"
                                size={24}
                                color="gray"
                              />
                            </Pressable>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                    <Modal
                      transparent
                      visible={!!selectedImage}
                      onRequestClose={handleClose}
                    >
                      <View style={styles.modalContainer}>
                        <Animated.Image
                          source={{ uri: selectedImage }}
                          style={[
                            styles.modalImage,
                            {
                              transform: [{ scale: scaleAnimation }],
                            },
                          ]}
                        />
                        <Pressable
                          style={styles.closeButton}
                          onPress={handleClose}
                        >
                          <Entypo
                            name="circle-with-cross"
                            size={40}
                            color="white"
                          />
                        </Pressable>
                      </View>
                    </Modal>
                  </View>
                </ScrollView>
                <Pressable
                  onPress={() => setAddMore(!addMore)}
                  style={{ alignSelf: "flex-start" }}
                >
                  <View style={{ marginLeft: 36, marginTop: 45 }}>
                    <AddMoreImage />
                  </View>
                </Pressable>
              </View>
            )}

            {!addMore ? (
              imagesLocal.length > 0 && (
                <View className="w-full h-[68px] bg-[#fb8c00] justify-center absolute bottom-0 left-0 right-0">
                  <Pressable
                    onPress={() =>
                      navigation.navigate("imagePreview", { data: imagesLocal })
                    }
                  >
                    <Text className="text-white font-bold text-center text-[16px]">
                      Continue
                    </Text>
                  </Pressable>
                </View>
              )
            ) : (
              <View className="w-full absolute bottom-0 items-center left-0 right-0 px-[10px]">
                <Pressable onPress={pickImage}>
                  <View className="w-full flex flex-row justify-between px-[40px] py-[20px]">
                    <Text className="text-[14px]">Upload Image</Text>
                    <FontAwesome name="arrow-right" size={15} color="black" />
                  </View>
                </Pressable>
                <View className="h-[1px] w-full bg-gray-300"></View>
                <Pressable onPress={() => setCameraScreen(true)}>
                  <View className="w-full flex flex-row justify-between px-[40px] py-[20px]">
                    <Text className="text-[14px]">Click Image</Text>
                    <FontAwesome name="arrow-right" size={15} color="black" />
                  </View>
                </Pressable>
              </View>
            )}
          </View>
          <ModalCancel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            imagesLocal={imagesLocal}
            setImagesLocal={setImagesLocal}
            index={imgIndex}
          />
          {modalVisible && <View style={styles.overlay} />}
        </SafeAreaView>
      )}

      {cameraScreen && (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flashMode}
            zoom={zoom}
            whiteBalance={whiteBalance}
            autoFocus={autoFocus}
            ref={(ref) => setCamera(ref)}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  justifyContent: "center",

                  // alignItems: "center", // Align items in the center vertically
                  paddingHorizontal: 20,
                  paddingTop: 5, // Add horizontal padding for space
                }}
              >
                <View style={{ alignItems: "center", flex: 1 }}>
                  {/* Wrap flash button in a centered container */}
                  <Pressable
                    onPress={() =>
                      setFlashMode(
                        flashMode === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.on
                          : Camera.Constants.FlashMode.off
                      )
                    }
                    style={{
                      backgroundColor: "#FB8C00",
                      padding: 5,
                      borderRadius: 100,
                    }}
                  >
                    <MaterialIcons
                      name={
                        flashMode === Camera.Constants.FlashMode.on
                          ? "flash-on"
                          : "flash-off"
                      }
                      size={30}
                      color="white"
                    />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => setCameraScreen(false)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 5,
                    backgroundColor: "#FB8C00",
                    padding: 5,
                    borderRadius: 100,
                  }}
                >
                  <AntDesign name="closecircleo" size={30} color="white" />
                </Pressable>
              </View>

              <View style={styles.bottomBar}>
                <Pressable onPress={takePicture} style={styles.captureButton}>
                  <Ionicons name="camera" size={50} color="white" />
                </Pressable>
                <Pressable
                  onPress={() =>
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    )
                  }
                  style={{
                    backgroundColor: "#FB8C00",
                    padding: 5,
                    borderRadius: 100,
                    position: "absolute",
                    right: 5,
                    bottom: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 40,
                      padding: 5,
                      borderRadius: 100,
                    }}
                  >
                    <MaterialIcons
                      name="flip-camera-ios"
                      size={40}
                      color="white"
                    />
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </Camera>
        </View>
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 5,
    marginTop: 10,
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: 168,
    height: 232,
    borderRadius: 10,
  },
  // deleteIc: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 5,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent greyish background
  },
  bottomBar: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#FB8C00",
    padding: 10,
    borderRadius: 100,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AddImageScreen;
