import React, { Component } from "react";
import { StyleSheet, Dimensions, Alert, StatusBar, View } from "react-native";
import { AudioContext } from "./AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "./AudioListItem";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export class AudioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: [],
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = (audio) => {
    this.setState({
      audio: audio.uri,
    });
    Alert.alert("Upload This Audio?", audio.filename, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => this.upload(audio.id) },
    ]);
  };
  upload = async (audioID) => {
    const childPath = `audio/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const responce = await fetch(this.state.audio);
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
          Alert.alert("Alert Title");
          this.savePostToFirestore(downloadURL, audioID);
        });
      }
    );
  };
  savePostToFirestore = (downloadURL, audioID) => {
    firebase
      .firestore()
      .collection("audios")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        id: audioID,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  rowRenderer = (type, item, index) => {
    return (
      <AudioListItem
        title={item.filename}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
      />
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          if (!dataProvider._data.length) return null;
          return (
            <View style={styles.container}>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
            </View>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
});

export default AudioList;
