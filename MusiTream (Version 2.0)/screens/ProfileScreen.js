import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

require("firebase/firestore");

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function Profile(props) {
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState(false);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
  const [isAudioModalVisible, setAudioModalVisible] = useState(false);
  const [followingsCount, setFollowingsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  const [audioPosts, setAudioPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
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
        .onSnapshot((snapshot) => {
          const about = snapshot.data().about;
          const name = snapshot.data().name;
          let profilePhoto = snapshot.data().photo;
          const userType = snapshot.data().type;

          if (profilePhoto == "" || profilePhoto === null) {
            profilePhoto =
              "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/TempProfilePic.png?alt=media&token=299d97c9-99db-417e-84c9-b97c92b695e3";
          }

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
      .collection("audios")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .orderBy("uploadedAt", "desc")
      .onSnapshot((snapshot) => {
        let userAudioPost = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setAudioPosts(userAudioPost);
      });
    followings();
    followers();
    userProfileInfo();

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
  }, [props.route.params.uid, refreshing]);

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

  const [selectedPost, setSelectedPost] = useState("");

  const visualPostFeed = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.mediaContainer}
          onPress={() => {
            setPhotoModalVisible(true);
            setSelectedPost(item);
          }}
        >
          <Image style={styles.image} source={{ uri: item.downloadURL }} />
        </TouchableOpacity>

        <Modal isVisible={isPhotoModalVisible} style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => {
              setPhotoModalVisible(false);
            }}
          >
            <Ionicons
              style={styles.closeButton}
              name="close-circle-outline"
              size={30}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.clickable}>
            <Image
              style={styles.image}
              source={{ uri: selectedPost.downloadURL }}
            />
            <Text style={styles.caption}>{selectedPost.description}</Text>
          </View>
        </Modal>
      </View>
    );
  };
  const [audioState, setAudioState] = useState({
    soundObj: null,
    playObject: null,
    currentAudio: null,
  });
  const [iconState, setIconState] = useState(true);

  async function playSound(audio) {
    if (
      audioState.soundObj === null ||
      (audioState.soundObj !== null && audioState.currentAudio.id !== audio.id)
    ) {
      if (audioState.playObject !== null) {
        audioState.playObject.unloadAsync();
      }
      const playObject = new Audio.Sound();
      const status = await playObject.loadAsync(
        { uri: audio.downloadURL },
        { shouldPlay: true }
      );
      setIconState(false);
      return setAudioState({
        ...audioState,
        playObject: playObject,
        currentAudio: audio,
        soundObj: status,
      });
    }
    if (audioState.soundObj.isLoaded && audioState.soundObj.isPlaying) {
      const status = await audioState.playObject.setStatusAsync({
        shouldPlay: false,
      });
      setIconState(true);
      return setAudioState({
        ...audioState,
        soundObj: status,
      });
    }
    if (
      audioState.soundObj.isLoaded &&
      !audioState.soundObj.isPlaying &&
      audioState.currentAudio.id === audio.id
    ) {
      const status = await audioState.playObject.playAsync();
      setIconState(false);
      return setAudioState({
        ...audioState,
        soundObj: status,
      });
    }
  }
  const audioPostFeed = ({ item }) => {
    const commonImageURL =
      "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/new-audio-jobs-62.jpg?alt=media&token=4a1125cf-826a-43cc-ab97-f3e7a7ea80a9";
    let name = "";
    return (
      <View>
        <TouchableOpacity
          style={styles.mediaContainer}
          onPress={() => {
            setAudioModalVisible(true);
            setSelectedPost(item);
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
            }}
            source={{
              uri: commonImageURL,
            }}
          />
        </TouchableOpacity>

        <Modal isVisible={isAudioModalVisible} style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => {
              setAudioModalVisible(false);
            }}
          >
            <Ionicons
              style={styles.closeButton}
              name="close-circle-outline"
              size={30}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.clickable}>
            <ImageBackground
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              source={{
                uri: commonImageURL,
              }}
            >
              <View
                style={{
                  position: "absolute",
                }}
              >
                {audioState.soundObj !== null &&
                audioState.soundObj.isPlaying &&
                selectedPost.id !== audioState.currentAudio.id ? (
                  <AntDesign
                    name="play"
                    color="white"
                    size={80}
                    onPress={() => {
                      playSound(selectedPost);
                    }}
                  />
                ) : (
                  <AntDesign
                    name={iconState ? "play" : "pause"}
                    color="white"
                    size={80}
                    onPress={() => {
                      playSound(selectedPost);
                    }}
                  />
                )}
              </View>
            </ImageBackground>

            <Text style={styles.caption}>{selectedPost.description}</Text>
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
      <SafeAreaView style={{ flex: 1, marginBottom: 40 }}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.arrowBack}
              onPress={() => props.navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
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
              <MaterialIcons name="more-vert" color="#CBCBCB" size={40} />
            </TouchableOpacity>
            <View style={styles.pageTitle}>
              <Text
                style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}
              >
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
                  <Text style={styles.text}>
                    {audioPosts.length + posts.length}
                  </Text>
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
                    color: "#CBCBCB",
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
                    <FollowButton
                      onPress={() => onUnfollow()}
                      followStat="FOLLOWING"
                    />
                  ) : (
                    <FollowButton
                      onPress={() => onFollow()}
                      followStat="FOLLOW"
                    />
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
            <View style={styles.mediaBorder}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={audioPosts}
                renderItem={audioPostFeed}
              />
              <View style={styles.contentCounter}>
                <Text style={styles.text}>{audioPosts.length}</Text>
                <Text style={styles.subText}>AUDIO</Text>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const FollowButton = ({ onPress, followStat }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 12,
        marginTop: 30,
        backgroundColor: "#7B61FF",
        width: 120,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "400", color: "#CBCBCB" }}>
        {followStat}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  arrowBack: {
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
  more: {
    position: "absolute",
    marginStart: 330,
    marginHorizontal: 16,
  },
  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 3,
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
    color: "white",
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
    color: "white",
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
