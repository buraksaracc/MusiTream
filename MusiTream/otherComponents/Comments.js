import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import firebase from "firebase";

require("firebase/firestore");

export function Comments(props) {
  const [postComments, setComments] = useState([]);
  const [comment, setUsersComment] = useState(null);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const fetData = firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.userID)
      .collection("userPosts")
      .doc(props.route.params.postID)
      .collection("comments")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((data) => {
          const getComment = data.data().comments;
          const getUserId = data.id;

          firebase
            .firestore()
            .collection("users")
            .doc(getUserId)
            .get()
            .then((snapshot2) => {
              let key = "";
              const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (let i = 0; i < 10; i++) {
                key += possible.charAt(
                  Math.floor(Math.random() * possible.length)
                );
              }
              if (snapshot2.exists) {
                const username = snapshot2.data().name;

                memoizedCallback([
                  Object.assign(
                    {},
                    { postOwnerID: props.route.params.userID },
                    { userComment: getComment },
                    { userID: getUserId },
                    { userName: username },
                    { uniqueKey: key },
                    { postOwnerUserName: props.route.params.userName },
                    { postId: props.route.params.postID }
                  ),
                ]);
              }
            });
        });
      });
    return () => fetData();
  }, [updated]);

  const memoizedCallback = useCallback(
    (Comment) => {
      setComments(Comment);
    },
    [postComments]
  );
  const onPressComment = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.userID)
      .collection("userPosts")
      .doc(props.route.params.postID)
      .collection("comments")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          firebase
            .firestore()
            .collection("posts")
            .doc(props.route.params.userID)
            .collection("userPosts")
            .doc(props.route.params.postID)
            .collection("comments")
            .doc(firebase.auth().currentUser.uid)
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion({
                Comment: comment,
              }),
            });
        } else {
          firebase
            .firestore()
            .collection("posts")
            .doc(props.route.params.userID)
            .collection("userPosts")
            .doc(props.route.params.postID)
            .collection("comments")
            .doc(firebase.auth().currentUser.uid)
            .set({
              comments: [
                {
                  Comment: comment,
                },
              ],
            });
        }
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
  const renderItem2 = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "black", fontSize: 25 }}>{item.Comment}</Text>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    const data = item.userComment;
    let key = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const A = [];
    const B = [];
    let RealArr = [];
    for (const index in data) {
      for (let i = 0; i < 10; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      A.push(Object.assign({}, data[index], { key: key }));
      RealArr = [...new Set([...A, ...RealArr])];
    }
    return (
      <FlatList
        numColumns={1}
        horizontal={false}
        data={RealArr}
        renderItem={renderItem2}
        keyExtractor={(arrayItem) => arrayItem.key}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ paddingTop: 100, alignSelf: "center" }}
        numColumns={1}
        horizontal={false}
        data={postComments}
        renderItem={renderItem}
        keyExtractor={(item) => item.uniqueKey}
      />
      <View
        style={{
          width: "100%",
          paddingBottom: 50,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#7B61FF",
            color: "black",
            padding: 8,
            marginTop: 25,
            margin: 15,
            borderRadius: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
          placeholder=""
          placeholderTextColor="rgba(174, 163, 163, 0.6)"
          onChangeText={(text) => setUsersComment(text)}
        />
        <Button
          title="send"
          onPress={() => {
            if (comment != null) {
              onPressComment();
              setUpdated(comment);
            }
          }}
        />
      </View>
    </View>
  );
}
