import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

require("firebase/firestore");
require("firebase/firebase-storage");

export function ImagePickFromGallery({ navigation }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const responce = await fetch(image);
    const blob = await responce.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          Alert.alert("", "Image uploaded!");
          savePostToFirestore(downloadURL);
        });
      }
    );
  };
  const savePostToFirestore = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        description: description,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={styles.containerForLanding}>
      <TouchableOpacity
        style={styles.arrowBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>

      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Add Post
        </Text>
      </View>
      <View style={styles.addPost}>
        {image !== null ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.addPostText}>About:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Write something about your post!"
              placeholderTextColor="#656565"
              onChangeText={(value) => setDescription(value)}
            />
            <TouchableOpacity style={styles.postButton} onPress={pickImage}>
              <Text style={styles.postText}>SELECT MEDIA</Text>
            </TouchableOpacity>

            <Text style={styles.addPostText}>Media:</Text>

            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => upload(image)}
            >
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.postButton} onPress={pickImage}>
              <Text style={styles.postText}>SELECT MEDIA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => upload(image)}
            >
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export function uploadFromCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const upload = async () => {
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const responce = await fetch(image);
    const blob = await responce.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          savePostToFirestore(downloadURL);
        });
      }
    );
  };
  const savePostToFirestore = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        description: description,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"1:1"}
        >
          <FontAwesome
            name="eye"
            style={styles.button}
            size={25}
            color="white"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </Camera>
      </View>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Save" onPress={() => upload(image)} />
      {image !== null ? (
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Description..."
            onChangeText={(value) => setDescription(value)}
          />
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  containerForLanding: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  inputs: {
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
    marginLeft: 98,
    marginTop: 15,
    color: "white",
  },
  image: {
    width: undefined,
    height: 200,
    marginLeft: 80,
  },
  addPost: {
    alignSelf: "center",
    marginTop: 200,
    width: 350,
    height: 300,
  },
  addPostText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#CBCBCB",
    marginTop: 10,
    padding: 10,
  },

  postButton: {
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 12,
    marginTop: 30,
    backgroundColor: "#7B61FF",
    width: 200,
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
  postText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#CBCBCB",
  },
});
