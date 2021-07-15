import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import firebase from "firebase";

require("firebase");
require("firebase/firestore");

export function Addpost({ navigation }) {
  // for pop up windows
  const [isModalVisible, setModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [explanation, setExplanation] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const toggleModalTwo = () => {
    setModalTwoVisible(!isModalTwoVisible);
  };

  const createJobAd = () => {
    firebase
      .firestore()
      .collection("jobAds")
      .doc(firebase.auth().currentUser.uid)
      .set({
        compName: companyName,
        jobTitle: jobTitle,
        jobType: jobType,
        explanation: explanation,
      });
    Alert.alert("", "Job ad created.");
    setModalTwoVisible(false);
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
      <View style={styles.margining}>
        <TouchableOpacity
          style={styles.clickable}
          onPress={() => navigation.navigate("FromGallery")}
        >
          <Ionicons
            style={{ position: "absolute", marginLeft: 8 }}
            name="images"
            size={25}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={styles.clickable}
            onPress={() => navigation.navigate("FromCamera")}
          >
            <Ionicons
              style={{ position: "absolute", marginLeft: 8 }}
              name="camera"
              size={25}
              color="#CBCBCB"
            ></Ionicons>
            <Text style={styles.settings}>From Camera</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={styles.clickable}
            onPress={() => navigation.navigate("MediaLibAudio")}
          >
            <Ionicons
              style={{ position: "absolute", marginLeft: 8 }}
              name="musical-notes"
              size={25}
              color="#CBCBCB"
            ></Ionicons>
            <Text style={styles.settings}>Upload Audio</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              style={styles.closeButton}
              name="close-circle-outline"
              size={30}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.addPost}>
            <Text style={styles.addPostText}>About:</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Write something about your post!"
              placeholderTextColor="#656565"
            />
            <Text style={styles.addPostText}>Media:</Text>

            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity>
          <TouchableOpacity style={styles.clickable} onPress={toggleModalTwo}>
            <Ionicons
              style={{ position: "absolute", marginLeft: 8 }}
              name="briefcase"
              size={25}
              color="#CBCBCB"
            ></Ionicons>
            <Text style={styles.settings}>Job Ad</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Modal isVisible={isModalTwoVisible}>
          <TouchableOpacity onPress={toggleModalTwo}>
            <Ionicons
              style={styles.closeButton}
              name="close-circle-outline"
              size={30}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.addPost}>
            <Text style={styles.addPostText}>Company:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="Enter your company name"
              placeholderTextColor="#656565"
              onChangeText={(text) => setCompanyName(text)}
            />
            <Text style={styles.addPostText}>Job Title:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="Enter the job title"
              placeholderTextColor="#656565"
              onChangeText={(text) => setJobTitle(text)}
            />
            <Text style={styles.addPostText}>Job Type:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="Full-Time/Intern/Remote..."
              placeholderTextColor="#656565"
              onChangeText={(text) => setJobType(text)}
            />
            <Text style={styles.addPostText}>Explanation:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="What do you want from an applicant?"
              placeholderTextColor="#656565"
              onChangeText={(text) => setExplanation(text)}
            />
            <TouchableOpacity style={styles.postButton} onPress={createJobAd}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  settings: {
    marginLeft: 40,
    marginRight: 15,
    width: "100%",
    fontWeight: "800",
    fontSize: 14,
    color: "#CBCBCB",
  },
  clickable: {
    padding: 2,
    width: undefined,
    height: 40,
    backgroundColor: "rgba(195, 183, 255, 0.42)",
    alignSelf: "center",
    fontSize: 16,
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 15,
  },
  margining: {
    marginTop: 200,
  },
  addPostText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#CBCBCB",
    padding: 10,
  },
  addPost: {
    backgroundColor: "#35303D",
    borderRadius: 30,
    alignSelf: "center",
    width: 350,
    padding: 20,
  },
  closeButton: {
    color: "#CBCBCB",
    marginLeft: 315,
  },
  inputs: {
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
    marginLeft: 98,
    marginTop: 26,
  },
  image: {
    width: 200,
    height: 150,
    marginLeft: 80,
  },
  postButton: {
    height: 25,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 30,
    backgroundColor: "#7B61FF",
    width: 130,
  },
  postText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#CBCBCB",
  },
  jobInputs: {
    padding: 8,
    fontSize: 12,
    fontWeight: "500",
  },
});
