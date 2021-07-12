import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function Addpost({ navigation }) {
  // for pop up window
 
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const toggleModalTwo = () => {
    setModalTwoVisible(!isModalTwoVisible);
  };
  return (
    <View style={styles.containerForLanding}>
      <TouchableOpacity style={styles.arrowBack}>
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>

      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Add Post
        </Text>
      </View>
      <View style={styles.margining}>
        <TouchableOpacity style={styles.clickable}>
          <Ionicons
            style={{ position: "absolute", marginLeft: 8 }}
            name="images"
            size={25}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity style={styles.clickable}>
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
             <TouchableOpacity style={styles.clickable}>
          <Ionicons
            style={{ position: "absolute", marginLeft: 8 }}
            name="musical-notes"
            size={25}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>Upload Audio</Text>
        </TouchableOpacity>
        </TouchableOpacity>
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
            />
            <Text style={styles.addPostText}>Job Title:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="Enter the job title"
              placeholderTextColor="#656565"
            />
<Text style={styles.addPostText}>Job Type:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="Full-Time/Intern/Remote..."
              placeholderTextColor="#656565"
            />
            <Text style={styles.addPostText}>Explanation:</Text>
            <TextInput
              style={styles.jobInputs}
              placeholder="What do you want from an applicant?"
              placeholderTextColor="#656565"
            />
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}
