import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Explore } from "./ExploreScreen";
import { Profile } from "./ProfileScreen";
import { Search } from "./SearchScreen";
import { LiveStream } from "./StreamScreen";
import {
  ColorArray,
  GradientValues,
  GradientStyle,
} from "../otherComponents/SharedDesign";
import firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";

require("firebase/firestore");
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function Home({ navigation }) {
  const [followings, setFollowings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let feed = [];
    firebase
      .firestore()
      .collection("follow")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowings")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          const id = doc.id;
          firebase
            .firestore()
            .collection("users")
            .doc(id)
            .get()
            .then((snapshot) => {
              const username = snapshot.data().name;
              const userType = snapshot.data().type;
              let profilePhoto = snapshot.data().photo;
              if (profilePhoto == "" || profilePhoto === null) {
                profilePhoto =
                  "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/TempProfilePic.png?alt=media&token=299d97c9-99db-417e-84c9-b97c92b695e3";
              }
              firebase
                .firestore()
                .collection("posts")
                .doc(id)
                .collection("userPosts")
                .orderBy("uploadedAt", "desc")
                .get()
                .then((snapshot) => {
                  snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const postId = doc.id;
                    firebase
                      .firestore()
                      .collection("posts")
                      .doc(id)
                      .collection("userPosts")
                      .doc(postId)
                      .collection("likes")
                      .doc(firebase.auth().currentUser.uid)
                      .get()
                      .then((snapshot) => {
                        let liked = false;
                        if (snapshot.exists) {
                          liked = true;
                        } else {
                        }
                        feed.push(
                          Object.assign(
                            {},
                            { userId: id },
                            { profilePic: profilePhoto },
                            { userName: username },
                            { postData: data },
                            { postId: postId },
                            { liked: liked },
                            { userType: userType }
                          )
                        );
                        feed.sort(
                          (a, b) =>
                            a.postData.uploadedAt < b.postData.uploadedAt
                        );
                        setFollowings(feed);
                      });
                  });
                });
            });
        });
      });
  }, [refreshing]);

  const onPressAdd = () => {
    navigation.navigate("AddPost");
  };

  const onPressLike = (postOwner, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postOwner)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const onPressUnlike = (postOwner, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postOwner)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };
  const Item = ({ item, onPress, textColor }) => (
    <View>
      <View style={styles.profileBorder}>
        <View style={styles.profilePic}>
          <Image
            style={{ flex: 1, aspectRatio: 1 / 1 }}
            source={{ uri: item.profilePic }}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.username}>{item.userName}</Text>
          <Text style={styles.usertype}>{item.userType}</Text>
        </View>
        <View style={styles.aboutPost}>
          <Text
            style={{
              color: "#CBCBCB",
              fontSize: 13,
              padding: 10,
              marginLeft: 30,
              width: 330,
            }}
          >
            {item.description}
          </Text>
        </View>

        <View style={styles.postPic}>
          <Image
            source={{ uri: item.postData.downloadURL }}
            style={styles.image1}
          ></Image>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.comment}>
            <FontAwesome
              name="comment"
              style={{ fontSize: 30, color: "white" }}
              onPress={() => {
                navigation.navigate("Comments", {
                  postID: item.postId,
                  userID: item.userId,
                  userName: item.userName,
                });
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.like}>
            <FontAwesome
              name="heart"
              style={[{ fontSize: 30 }, textColor]}
              onPress={onPress}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const [selectedId, setSelectedId] = useState(null);
  const [check, setCheck] = useState(null);

  const renderItem = ({ item }) => {
    let color = "";

    if (item.postId === selectedId && check == "red") {
      onPressUnlike(item.userId, item.postId);
      color = "black";
    } else if (item.postId === selectedId && check == "black") {
      onPressLike(item.userId, item.postId);
      color = "red";
    } else {
      color = item.liked ? "red" : "black";
    }
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.postId);
          setCheck(color);
        }}
        textColor={{ color }}
      />
    );
  };
  return (
    <LinearGradient
      colors={ColorArray}
      start={GradientValues}
      style={GradientStyle}
    >
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: 20,
          marginTop: Constants.statusBarHeight,
        }}
      >
        <View style={styles.pageTitle}>
          <Text
            style={{
              color: "#CBCBCB",
              fontSize: 25,
              fontWeight: "600",
              alignSelf: "flex-start",
            }}
          >
            Home
          </Text>
        </View>
        <View
          style={{
            paddingRight: 30,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <FontAwesome
            name="plus-square"
            color="#CBCBCB"
            size={25}
            onPress={onPressAdd}
            style={{ paddingRight: 25 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={followings}
            renderItem={renderItem}
            keyExtractor={(item) => item.postId}
            extraData={selectedId}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#e6e6e6",
        inactiveTintColor: "#737373",
        showLabel: false,
        style: {
          borderRadius: 25,
          height: 50,
          backgroundColor: "#000000",
          borderTopWidth: 0,
          position: "absolute",
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size - 2} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size - 2} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" color={color} size={size - 2} />
          ),
        }}
      />
      <Tab.Screen
        name="Stream"
        component={LiveStream}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="broadcast-tower"
              color={color}
              size={size - 1}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size - 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 25,
    marginStart: 30,
  },
  profilePic: {
    marginTop: 15,
    marginLeft: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
  },
  aligning: {
    alignSelf: "center",
  },

  image: {
    flex: 1,
    width: 100,
    height: undefined,
  },
  postPic: {
    alignSelf: "center",
    marginTop: 24,
    width: 270,
    height: 170,
    borderRadius: 100,
  },
  image1: {
    alignSelf: "center",
    flex: 1,
    width: 300,
    height: undefined,
  },
  comment: {
    marginRight: 95,
  },
  like: {
    marginRight: 95,
  },
  share: {
    marginRight: 95,
  },

  aboutPost: {},

  profileBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(53, 48, 61, 1)",
    width: 380,
    height: 400,
    marginTop: 20,
  },

  info: {
    position: "absolute",
    color: "white",

    marginLeft: 90,
    marginBottom: 70,
    marginTop: 10,
  },
  username: {
    color: "#CBCBCB",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 20,
  },
  usertype: {
    marginLeft: 20,
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "400",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 95,
    marginTop: 18,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  text: {
    fontSize: 18,
    color: "#CBCBCB",
    fontWeight: "400",
  },
  subText: {
    color: "#CBCBCB",
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "500",
  },

  mediaBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#35303D",
    width: 380,
    height: 200,
    marginTop: 10,
  },
  mediaContainer: {
    width: 100,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
});
