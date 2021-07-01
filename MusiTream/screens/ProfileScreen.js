import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import {
  ColorArray,
  GradientValues,
  GradientStyle,
} from "../otherComponents/SharedDesign";

require("firebase/firestore");

export function Profile(props) {
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const followings = () => {
      firebase
        .firestore()
        .collection("follow")
        .doc(props.route.params.uid)
        .collection("userFollowings")
        .get()
        .then((snapshot) => {
          setFollowingsCount(snapshot.size);
        });
    };
    const followers = () => {
      firebase
        .firestore()
        .collection("follow")
        .doc(props.route.params.uid)
        .collection("userFollowers")
        .get()
        .then((snapshot) => {
          setFollowersCount(snapshot.size);
        });
    };
    const userProfileInfo = () => {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          const about = snapshot.data().about;
          const name = snapshot.data().name;
          const profilePhoto = snapshot.data().photo;
          const userType = snapshot.data().type;
          setUserInfo(
            Object.assign(
              {},
              {
                about: about,
                profilePhoto: profilePhoto,
                name: name,
                type: userType,
              }
            )
          );
        });
    };

    if (props.route.params.uid == firebase.auth().currentUser.uid) {
      firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("uploadedAt", "desc")
        .get()
        .then((snapshot) => {
          let userPost = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setPosts(userPost);
        });
      followings();
      followers();
      userProfileInfo();
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("uploadedAt", "desc")
        .get()
        .then((snapshot) => {
          let userPost = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setPosts(userPost);
        });
      firebase
        .firestore()
        .collection("follow")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowings")
        .doc(props.route.params.uid)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        });
      followings();
      followers();
      userProfileInfo();
    }
  }, [props.route.params.uid]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("follow")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowings")
      .doc(props.route.params.uid)
      .set({});
    firebase
      .firestore()
      .collection("follow")
      .doc(props.route.params.uid)
      .collection("userFollowers")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("follow")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowings")
      .doc(props.route.params.uid)
      .delete();
    firebase
      .firestore()
      .collection("follow")
      .doc(props.route.params.uid)
      .collection("userFollowers")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedPost, setSelectedPost] = useState("");

  const visualPostFeed = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.mediaContainer}
          onPress={() => {
            toggleModal();
            setSelectedPost(item.downloadURL);
          }}
        >
          <Image style={styles.image} source={{ uri: item.downloadURL }} />
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} style={{ marginTop: 50 }}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              style={styles.closeButton}
              name="close-circle-outline"
              size={30}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.clickable}>
            <Image style={styles.image} source={{ uri: selectedPost }} />
            <Text style={styles.caption}>
              {selectedPost === item.downloadURL ? item.description : ""}
            </Text>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={ColorArray}
      start={GradientValues}
      style={GradientStyle}
    >
      <ScrollView style={styles.container}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" color="#595959" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.more}
            onPress={() =>
              props.navigation.navigate("Settings", {
                uid: firebase.auth().currentUser.uid,
                namePlaceholder: userInfo.name,
                typePlaceholder: userInfo.type,
                aboutPlaceholder: userInfo.about,
                currentPhoto: userInfo.profilePhoto,
              })
            }
          >
            <MaterialIcons name="more-vert" color="#595959" size={40} />
          </TouchableOpacity>
          <View style={styles.pageTitle}>
            <Text style={{ color: "#595959", fontSize: 25, fontWeight: "600" }}>
              Profile
            </Text>
          </View>
          <View style={styles.profileBorder}>
            <View style={styles.profilePic}>
              <Image
                source={{ uri: userInfo.profilePhoto }}
                style={styles.image}
              ></Image>
            </View>

            <View style={styles.info}>
              <Text style={styles.username}>{userInfo.name}</Text>
              <Text style={styles.usertype}>{userInfo.type}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={styles.text}>58</Text>
                <Text style={styles.subText}>posts</Text>
              </View>
              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: "#DFD8C8",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Text style={styles.text}>{followersCount}</Text>
                <Text style={styles.subText}>FOLLOWERS</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.text}>{followingsCount}</Text>
                <Text style={styles.subText}>FOLLOWING</Text>
              </View>
            </View>
          </View>
          <View style={styles.aboutBorder}>
            <View
              style={{
                padding: 2,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "700",
                  marginBottom: 5,
                  marginTop: 3,
                }}
              >
                About
              </Text>
              <Text
                style={{
                  color: "#595959",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {userInfo.about}
              </Text>
            </View>
          </View>
          <View>
            {props.route.params.uid !== firebase.auth().currentUser.uid ? (
              <View style={{ padding: 10 }}>
                {follow ? (
                  <Button title="Following" onPress={() => onUnfollow()} />
                ) : (
                  <Button title="Follow" onPress={() => onFollow()} />
                )}
              </View>
            ) : null}
          </View>
          <View style={styles.mediaBorder}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={posts}
              renderItem={visualPostFeed}
            />
            <View style={styles.contentCounter}>
              <Text style={styles.text}>{posts.length}</Text>
              <Text style={styles.subText}>media</Text>
            </View>
          </View>
          <ScrollView style={styles.mediaBorder}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.audioBorder}>
                <TouchableOpacity style={styles.audioContent}>
                  <Ionicons name="pulse" color="#CBCBCB" size={40} />
                </TouchableOpacity>
                <Text style={styles.audioInfo}>this is my last song</Text>
              </View>

              <View style={styles.audioBorder}>
                <TouchableOpacity style={styles.audioContent}>
                  <Ionicons name="pulse" color="#CBCBCB" size={40} />
                </TouchableOpacity>
                <Text style={styles.audioInfo}>this is my third song</Text>
              </View>
              <View style={styles.audioBorder}>
                <TouchableOpacity style={styles.audioContent}>
                  <Ionicons name="pulse" color="#CBCBCB" size={40} />
                </TouchableOpacity>
                <Text style={styles.audioInfo}>this is my second song</Text>
              </View>
              <View style={styles.audioBorder}>
                <TouchableOpacity style={styles.audioContent}>
                  <Ionicons name="pulse" color="#CBCBCB" size={40} />
                </TouchableOpacity>
                <Text style={styles.audioInfo}>this is my first song</Text>
              </View>
            </ScrollView>
            <View style={styles.contentCounter}>
              <Text style={styles.text}>4</Text>
              <Text style={styles.subText}>audio</Text>
            </View>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  arrowBack: {
    justifyContent: "flex-start",
    marginTop: 60,
    marginHorizontal: 16,
  },
  more: {
    position: "absolute",
    marginTop: 60,
    marginStart: 330,
    marginHorizontal: 16,
  },
  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 63,
    marginStart: 60,
  },
  profilePic: {
    marginTop: 20,
    marginLeft: 108,
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  aligning: {
    alignSelf: "center",
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#595959",
    width: 315,
    height: 238,
    marginTop: 43,
  },

  info: {
    color: "#fff",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    color: "#CBCBCB",
    fontSize: 25,
    fontWeight: "700",
  },
  usertype: {
    color: "#AAAAAA",
    fontSize: 12,
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
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
  aboutBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(123, 97, 255, 0.5)",
    width: 285,
    height: 74,
    marginTop: 15,
  },
  mediaBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#35303D",
    width: 390,
    height: 200,
    marginTop: 15,
    marginBottom: 20,
  },
  mediaContainer: {
    borderWidth: 0.5,
    borderColor: "#383838",
    marginLeft: 35,
    marginTop: 30,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  navbar: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 5,
  },
  contentCounter: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    position: "absolute",
    width: 50,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  audioContent: {
    borderWidth: 1,
    borderColor: "#CBCBCB",
    backgroundColor: "rgba(195, 183, 255, 0.42)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 100,
    height: 134,
  },
  audioBorder: {
    textAlign: "center",
    width: 100,
    height: 180,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginLeft: 40,
  },
  audioInfo: {
    textAlign: "center",
    color: "#CBCBCB",
    fontSize: 10,
    fontWeight: "500",
  },
  caption: {
    marginTop: 5,
    fontWeight: "500",
    fontSize: 13,
    padding: 20,
    color: "#CBCBCB",
    textAlign: "center",
  },
  closeButton: {
    color: "#CBCBCB",
    marginLeft: 320,
  },

  clickable: {
    padding: 30,
    width: 350,
    height: 300,
    backgroundColor: "black",
    alignSelf: "center",
    fontSize: 16,
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 5,
  },
});
