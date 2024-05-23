import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome } from "@expo/vector-icons";

import Copy from "../../assets/Copy.svg";
import Document from "../../assets/Document.svg";
import Send from "../../assets/Send.svg";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon.svg";
import ChatMessage from "../../components/ChatMessage";
import ReplyMessage from "../../components/ReplyMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewRequests from "../../components/NewRequests";
import axios from "axios";
import { setAccept } from "../../redux/reducers/bidSlice";
import { useDispatch, useSelector } from "react-redux";
import RetailerBidMessage from "../../components/RetailerBidMessage";
import UserBidMessage from "../../components/UserBidMessage";
import UserMessage from "../../components/UserMessage";
import RetailerMessage from "../../components/RetailerMessage";

import RequestAcceptModal from "../../components/RequestAcceptModal";
import UserAttachment from "../../components/UserAttachment";
import RequestCancelModal from "../../components/RequestCancelModal";
import { socket } from "../utils/socket.io/socket";

const RequestPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);

  // const [requestInfo, setRequestInfo] = useState();
  const [user, setUser] = useState();
  const [bidRejected, setBidRejected] = useState();
  const [bidAccepted, setBidAccepted] = useState("new");
  const [messages, setMessages] = useState([]);
  const [accept, setAcceptLocal] = useState("active");
  const [modal, setModal] = useState(false);
  const [closeRequestModal, setCloseRequestModal] = useState(false);
  const [acceptRequestModal, setAcceptRequestModal] = useState(false);
  const [cancelRequestModal,setCancelRequestModal]=useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const requestInfo = route.params.data;

  useEffect(() =>async()=> {
   
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      setUser(userData);
      socket.emit('setup', requestInfo.users[0]._id);
      console.log('user connected with userId',requestInfo.users[0]._id);
      // console.log()
      socket.on('connected', () => {
        setSocketConnected(true);
        // Join the chat room after connection is established
       
        console.log('socket connected',userData._id, requestInfo?._id);
      });
     
  }, []);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        setUser(userData);
        // console.log(userData);
        // if (route.params) {
        //   setRequestInfo(route.params.data);
        // console.log("requestPage", requestInfo);
        //   if (route.params.data) {
        const response = await axios.get(
          "https://genie-backend-meg1.onrender.com/chat/get-spade-messages",
          {
            params: {
              id: requestInfo._id,
            },
          }
        );

        // Update state with new requests

        // console.log("response", response.data);
        // console.log("messreq", requestInfo);

        setMessages(response.data);
        console.log('user joined chat with chatId', response.data[0].chat._id);
        socket.emit("join chat", response?.data[0]?.chat?._id);
        // socket.emit("join chat",response.data[0].chat._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRequestData();
  }, []);

  // const AcceptBid = async () => {
  //   try {
  //     const lastMessage = messages[messages.length - 1];
  //     if (!lastMessage) {
  //       console.log("No messages available to update.");
  //       return;
  //     }
  //     console.log("updateingcard", requestInfo._id);
  //     const res = await axios.patch(
  //       `https://genie-backend-meg1.onrender.com/chat/modify-spade-retailer?id=${requestInfo?._id}`
  //     );
  //     const accept = await axios.patch(
  //       `https://genie-backend-meg1.onrender.com/chat/accept-bid?id=${requestInfo?._id}`
  //     );

  //     console.log("res after update", res);
  //     console.log("accept", accept.data);

  //     if (accept.status === 200) {
  //       console.log("Message updated successfully:", res.data);
  //       setAcceptLocal(accept?.data?.bidCompleted);
  //       // setAccept(dispatch(accept?.data?.bidCompleted));

  //       try {
  //         const response = await axios.patch(
  //           "https://genie-backend-meg1.onrender.com/chat/update-message",
  //           {
  //             id: lastMessage._id,
  //             type: "accepted",
  //           }
  //         );

  //         console.log("res", response);

  //         const updatedMessages = messages.map((message) => {
  //           if (message._id === lastMessage._id) {
  //             return { ...message, bidAccepted: "accepted" };
  //           }
  //           return message;
  //         });
  //         setMessages(updatedMessages);
  //       } catch (error) {
  //         console.log("Error updating chat details:", error);
  //       }
  //     } else {
  //       console.error("Error updating message");
  //     }
  //   } catch (error) {
  //     console.error("Error updating requestType:", error);
  //   }
  // };

  const RejectBid = async () => {
    try {
      const lastMessage = messages[messages.length - 1]; // Get the last message
      if (!lastMessage) {
        console.log("No messages available to update.");
        return;
      }

      // console.log("rejectingcard", requestInfo);
      // const res = await axios.patch(
      //   `https://genie-backend-meg1.onrender.com/chat/modify-spade-retailer?id=${requestInfo?._id}`
      // );
      // console.log("res after update", res);

      // console.log("resafterupdate", res);

      // if (res.status === 200) {
      // console.log("Message updated successfully:", res.data);
      try {
        const response = await axios.patch(
          "https://genie-backend-meg1.onrender.com/chat/update-message",
          {
            id: lastMessage._id,
            type: "rejected",
          }
        );

        // console.log("res", response);

        socket.emit('new message',response.data);

        const updatedMessages = messages.map((message) => {
          if (message._id === lastMessage._id) {
            return { ...message, bidAccepted: "rejected" };
          }
          return message;
        });
        setMessages(updatedMessages);
      } catch (error) {
        console.log("Error updating chat:", error);
      }
      // } else {
      //   console.error("Error updating message.");
      // }
    } catch (error) {
      console.error("Error updating requesttype:", error);
    }
  };

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      console.log("Message received from socket:", newMessageReceived);
      setMessages((prevMessages) => {
        if (prevMessages[prevMessages.length - 1]?.chat?._id === newMessageReceived?.chat?._id) {
          if (prevMessages[prevMessages.length - 1]?._id === newMessageReceived?._id) {
            // Update the last message if it's the same as the new one
            return prevMessages.map(message =>
              message._id === newMessageReceived._id ? newMessageReceived : message
            );
          } else {
            // Add the new message to the list
            return [...prevMessages, newMessageReceived];
          }
        }
        // If the chat ID does not match, return the previous messages unchanged
        return prevMessages;
      });
    };
  
    socket.on("message received", handleMessageReceived);
    console.log("Listening for 'message received' events");
  
    // Cleanup the effect
    return () => {
      socket.off("message received", handleMessageReceived);
      console.log("Stopped listening for 'message received' events");
    };
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="relative flex-grow">
        <View className="z-50 relative bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[30px]">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ padding: 2 }}
          >
            <FontAwesome name="arrow-left" size={15} color="black" />
          </Pressable>

          <View className="gap-[9px]">
            <View className="flex-row gap-[18px]">
              <View className="bg-[#F9F9F9] p-2 rounded-full">
                <Profile className="" />
              </View>
              <View className="w-[60%]">
                <Text className="text-[14px] text-[#2e2c43]">
                  {user?.storeName}
                </Text>
                <Text className="text-[12px] text-[#c4c4c4]">
                  Active 3 hr ago
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => {
              setModal(!modal);
            }}
          >
            <View className="px-[20px] py-[10px] ">
              <ThreeDots />
            </View>
          </Pressable>
        </View>
        {modal && (
          <View className="absolute top-[20px] right-[80px] z-50 bg-white rounded-md">
            <Pressable
            // onPress={() =>
            //   navigation.navigate("view-request", { data: spade })
            // }
            >
              <Text className="mx-5 border-1 border-b-[1px] py-3">
                View Request
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCloseRequestModal(true);
                setModal(!modal);
              }}
            >
              <Text className="mx-5 py-3">Close Request</Text>
            </Pressable>
          </View>
        )}

        <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
          <View className="flex-row gap-[10px] items-center">
            <Text className="text-[16px] font-bold">Request Id</Text>
            <Text>{requestInfo?.requestId._id}</Text>
          </View>
          <Text className="">
            {requestInfo?.requestId?.requestDescription} ...
          </Text>
        </View>

        {/*  message are mapped here */}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{ marginBottom: 90 }}
        >
          <View className="flex gap-[21px] px-[10px] pt-[40px] pb-[100px]">
            {/* <ChatMessage
              bidDetails={messages[0]}
             
            /> */}
            {messages?.map((message) => {
              console.log("mapping", message); // You can move console.log outside of the return statement if you want to log the value
              if (message?.sender?.refId !== user?._id) {
                if (message?.bidType === "true" || messages[0]===message) {
                  return (
                    <View key={message._id} className="flex flex-row justify-start">
                      <UserBidMessage bidDetails={message} />
                    </View>
                  );
                } else if (message?.bidType === "false") {
                  return (
                    <View key={message._id} className="flex flex-row justify-start">
                      <UserMessage bidDetails={message} />
                    </View>
                  );
                } else {
                  return (
                    <View key={message._id} className="flex flex-row justify-start">
                      <UserAttachment bidDetails={message} />
                    </View>
                  );
                }
              } else {
                if (message?.bidType === "true") {
                  return (
                    <View key={message._id} className="flex flex-row justify-end">
                      <RetailerBidMessage bidDetails={message} user={user} />
                    </View>
                  );
                } else {
                  return (
                    <View key={message._id} className="flex flex-row justify-end">
                      <RetailerMessage bidDetails={message} user={user} />
                    </View>
                  );
                }
              }
              
            })}
          </View>

          {/* Spacer View */}
        </ScrollView>
      </View>

      {/* Typing Area */}
      <View className="absolute bottom-0 left-0 right-0 pt-[10]">
      {requestInfo?.requestType === "new" ? (
  <View className="gap-[20px] items-center bg-white pt-[20px] shadow-2xl">
    <View>
      <Text className="text-[14px] font-bold text-center">
        Are you accepting the customer bid?
      </Text>
      <Text className="text-[14px] text-center">
        Please confirm the product availability by {"\n"} accepting this request
      </Text>
    </View>

    <View className="w-full flex-row justify-between bg-white">
      <TouchableOpacity onPress={() => setAcceptRequestModal(true)} style={{ flex: 1 }}>
        <View className="h-[63px] flex items-center justify-center border-[1px] bg-[#FB8C00] border-[#FB8C00]">
          <Text className="font-bold text-[16px] text-white">Accept</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCancelRequestModal(true)} style={{ flex: 1 }}>
        <View className="h-[63px] flex items-center justify-center border-2 border-[#FB8C00] bg-white">
          <Text className="font-bold text-[16px] text-[#FB8C00]">
            Product Not Available
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
) : (requestInfo?.requestType !== "cancelled" &&(requestInfo?.requestId?.requestActive === "completed" || accept === "completed")) ? (
  <TouchableOpacity
    onPress={() => navigation.navigate("bidQuery", {
      user: user,
      requestInfo: requestInfo,
      messages: messages
    })}
    style={{ padding: 20 ,backgroundColor:"white"}}
  >
    <View className="h-[63px] flex items-center justify-center bg-white border-[1px] border-[#FB8C00] rounded-3xl mx-[20px]">
      <Text className="font-bold text-[16px] text-[#fb8c00]">
        Send Message to Customer
      </Text>
    </View>
  </TouchableOpacity>
) : (requestInfo?.requestType !== "cancelled" && requestInfo?.requestId?.requestActive !== "completed" &&
    messages &&
    messages.length > 0 &&
    messages[messages.length - 1]?.bidType === "true" &&
    messages[messages.length - 1]?.bidAccepted === "new" &&
    messages[messages.length - 1]?.sender?.refId !== user?._id) ? (
  <View className="gap-[20px] items-center bg-white pt-[20px] shadow-2xl">
    <View>
      <Text className="text-[14px] font-bold text-center">
        Are you accepting the customer bid?
      </Text>
      <Text className="text-[14px] text-center">
        If you don’t understand the customer’s need,
        {"\n"}select no and send query for clarification.
      </Text>
    </View>

    <View className="w-full flex-row justify-between">
      <TouchableOpacity onPress={() => setAcceptRequestModal(true)} style={{ flex: 1 }}>
        <View className="h-[63px] flex items-center justify-center border-[1px] bg-[#FB8C00] border-[#FB8C00]">
          <Text className="font-bold text-[16px] text-white">Yes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={RejectBid} style={{ flex: 1 }}>
        <View className="h-[63px] flex items-center justify-center border-2 border-[#FB8C00] bg-white">
          <Text className="font-bold text-[16px] text-[#FB8C00]">No</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
) : ( requestInfo?.requestType !== "cancelled" && requestInfo?.requestId?.requestActive !== "completed" &&
    messages &&
    messages.length > 0 &&
    (
      (messages[messages.length - 1]?.bidType === "true" &&
      messages[messages.length - 1]?.bidAccepted === "rejected") ||
      messages[messages.length - 1]?.bidType === "false" ||
      messages[messages.length - 1]?.bidType === "image"
    )) ? (
  <View className="gap-[20px] bg-white pt-2">
    <TouchableOpacity
      onPress={() => navigation.navigate("bidQuery", {
        user: user,
        requestInfo: requestInfo,
        messages: messages
      })}
    >
      <View className="h-[63px] flex items-center justify-center border-[1px] border-[#FB8C00] rounded-3xl mx-[20px] bg-white">
        <Text className="font-bold text-[16px] text-[#fb8c00]">
          Send Message to Customer
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("bidPageInput", {
        user: user,
        requestInfo: requestInfo,
        messages: messages
      })}
    >
      <View className="h-[63px] flex items-center justify-center bg-[#FB8C00]">
        <Text className="font-bold text-[16px] text-white">
          Send a Bid
        </Text>
      </View>
    </TouchableOpacity>
  </View>
) : null}

      </View>
      <RequestCancelModal
        modalVisible={cancelRequestModal}
        setModalVisible={setCancelRequestModal}
        requestInfo={requestInfo}
      />
      <RequestCancelModal
        modalVisible={closeRequestModal}
        setModalVisible={setCloseRequestModal}
      />
      <RequestAcceptModal
        modalVisible={acceptRequestModal}
        setModalVisible={setAcceptRequestModal}
        messages={messages}
        setMessages={setMessages}
        requestInfo={requestInfo}
        setAcceptLocal={setAcceptLocal}
      />
       
      {closeRequestModal && <View style={styles.overlay} />}
      {acceptRequestModal && <View style={styles.overlay} />}
      {cancelRequestModal && <View style={styles.overlay} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent greyish background
  },
  // menuContainer: {
  //     flex: 1,
  //     // Add other styles for menu container
  // },
});

export default RequestPage;
