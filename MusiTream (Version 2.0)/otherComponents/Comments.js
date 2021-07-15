import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

require("firebase/firestore");

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function Comments(props) {
  const [postComments, setComments] = useState([]);
  const [comment, setUsersComment] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let commentFeed = [];

    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.userID)
      .collection("userPosts")
      .doc(props.route.params.postID)
      .collection("comments")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((data) => {
          const getUserId = data.id;

          firebase
            .firestore()
            .collection("users")
            .doc(getUserId)
            .get()
            .then((snapshot2) => {
              const username = snapshot2.data().name;
              let userPP = snapshot2.data().photo;
              if (userPP == "" || userPP === null) {
                userPP =
                  "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/TempProfilePic.png?alt=media&token=299d97c9-99db-417e-84c9-b97c92b695e3";
              }
              firebase
                .firestore()
                .collection("posts")
                .doc(props.route.params.userID)
                .collection("userPosts")
                .doc(props.route.params.postID)
                .collection("comments")
                .doc(getUserId)
                .collection("commentsForOnePost")
                .get()
                .then((commentsForAPost) => {
                  commentsForAPost.docs.map((doc) => {
                    const getCommentData = doc.data();

                    let key = "";
                    const possible =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (let i = 0; i < 10; i++) {
                      key += possible.charAt(
                        Math.floor(Math.random() * possible.length)
                      );
                    }
                    commentFeed.push(
                      Object.assign(
                        {},
                        { postOwnerID: props.route.params.userID },
                        { userComment: getCommentData },
                        { userID: getUserId },
                        { userName: username },
                        { userPic: userPP },
                        { uniqueKey: key },
                        { postOwnerUserName: props.route.params.userName },
                        { postId: props.route.params.postID }
                      )
                    );
                    commentFeed.sort(
                      (a, b) =>
                        a.userComment.uploadedAt > b.userComment.uploadedAt
                    );
                    let RealArr = [];
                    RealArr = [...new Set([...commentFeed, ...RealArr])];
                    setComments(RealArr);
                  });
                });
            });
        });
      });
  }, [updated, refreshing]);

  const onPressComment = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.userID)
      .collection("userPosts")
      .doc(props.route.params.postID)
      .collection("comments")
      .doc(firebase.auth().currentUser.uid)
      .set({ necessaryVariable: "" })
      .then(() => {
        firebase
          .firestore()
          .collection("posts")
          .doc(props.route.params.userID)
          .collection("userPosts")
          .doc(props.route.params.postID)
          .collection("comments")
          .doc(firebase.auth().currentUser.uid)
          .collection("commentsForOnePost")
          .add({
            Comment: comment,
            uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      });
  };
  /*const onPressDeleteComment = (postOwner, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postOwner)
      .collection("userPosts")
      .doc(postId)
      .collection("comments")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };*/
  const renderItem = ({ item }) => {
    return (
      <View style={styles.comment}>
        <Image source={{ uri: item.userPic }} style={styles.profilePic} />
        <Text style={styles.username}>{item.userName}</Text>

        <Text style={styles.commentText}>{item.userComment.Comment}</Text>
      </View>
    );
  };

  return (
    <View style={styles.containerForLanding}>
      <TouchableOpacity
        style={styles.arrowBack}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>
      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Comment
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={postComments}
          renderItem={renderItem}
          keyExtractor={(item) => item.uniqueKey}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View style={styles.comment}>
          <TextInput
            style={{
              padding: 8,
              fontSize: 12,
              fontWeight: "500",
              color: "#CBCBCB",
            }}
            placeholder="Write something to comment!"
            placeholderTextColor="#656565"
            onChangeText={(text) => setUsersComment(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => {
            if (comment != null) {
              onPressComment();
              setUpdated(!updated);
            }
          }}
        >
          <Text style={styles.postText}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerForLanding: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  arrowBack: {
    justifyContent: "flex-start",
    marginTop: 60,
    marginHorizontal: 16,
  },

  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 63,
    marginStart: 60,
  },
  commentText: {
    color: "#CBCBCB",
    fontSize: 12,
    padding: 10,
    marginLeft: 50,
    marginTop: 20,
    width: 250,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
  },
  username: {
    color: "#CBCBCB",
    fontSize: 14,
    fontWeight: "700",
    position: "absolute",
    marginLeft: 60,
  },

  comment: {
    alignSelf: "center",
    marginTop: 10,
    width: 300,
    height: 100,
    borderColor: "#CBCBCB",
    borderWidth: 0.3,
    borderRadius: 12,
  },

  postButton: {
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#7B61FF",
    width: 150,
  },
  postText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#CBCBCB",
  },
});
