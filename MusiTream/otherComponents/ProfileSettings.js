import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { Alert } from "react-native";

export function ProfileSettings(props) {
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [about, setAbout] = useState("");

  const updateStatus = () => {
    let checkName = name.length <= 1 ? false : true;
    let checkAbout = about.length <= 1 ? false : true;
    let checkType =
      userType.toLowerCase() == "producer" ||
      userType.toLowerCase() == "listener" ||
      userType.toLowerCase() == "advertiser"
        ? true
        : false;

    if (checkName === true) {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.prop.uid)
        .update({ name: name });
    }
    if (checkType === true) {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.prop.uid)
        .update({ type: userType });
    }
    if (checkAbout === true) {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.prop.uid)
        .update({ about: about });
    }
    if (checkType === false && checkAbout === false && checkName === false) {
      Alert.alert("There has been no changes.");
    } else if (
      (checkType === true && checkAbout === true && checkName === true) ||
      (checkType === true && checkAbout === true) ||
      (checkAbout === true && checkName === true) ||
      (checkType === true && checkName === true) ||
      checkType === true ||
      checkAbout === true ||
      checkName === true
    ) {
      Alert.alert("Profile is updated!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowBack}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>
      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Profile Settings
        </Text>
      </View>
      <View style={styles.profileBorder}>
        <View style={styles.profilePic}>
          <Image
            source={{ uri: props.route.params.prop.currentPhoto }}
            style={styles.image}
          ></Image>
        </View>
        <TouchableOpacity style={styles.add}>
          <Ionicons name="ios-add-circle" size={35} color="#35303D"></Ionicons>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.settingsBorder}>
          <Text style={styles.text}>user name:</Text>
          <TextInput
            style={styles.inputs}
            placeholder={props.route.params.prop.namePlaceholder}
            placeholderTextColor="#656565"
            onChangeText={(value) => setName(value)}
          ></TextInput>
          <Text style={styles.text}>user type:</Text>
          <TextInput
            style={styles.inputs}
            placeholder={props.route.params.prop.typePlaceholder}
            placeholderTextColor="#656565"
            onChangeText={(value) => setUserType(value)}
          ></TextInput>
          <Text style={styles.text}>about:</Text>
          <TextInput
            style={styles.inputBorder}
            placeholder={props.route.params.prop.aboutPlaceholder}
            placeholderTextColor="#656565"
            numberOfLines={3}
            onChangeText={(value) => setAbout(value)}
          ></TextInput>
          <TouchableOpacity style={styles.saveButton} onPress={updateStatus}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  arrowBack: {
    justifyContent: "flex-start",
    marginTop: 60,
    marginHorizontal: 16,
  },
  saveButton: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 50,
    backgroundColor: "rgba(195, 183, 255, 0.42)",
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
    width: 315,
    height: 180,
    marginTop: 50,
  },
  add: {
    position: "absolute",
    marginLeft: 178,
    marginTop: 95,
  },

  text: {
    fontSize: 14,
    color: "#CBCBCB",
    fontWeight: "400",
    textTransform: "uppercase",
    marginTop: 25,
  },
  inputs: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    color: "white",
  },
  settingsBorder: {
    alignSelf: "center",
    width: 270,
    height: 400,
  },
  inputBorder: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    color: "white",
    width: 200,
    height: 200,
    textAlignVertical: "top",
  },
  saveButton: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 50,
    backgroundColor: "rgba(195, 183, 255, 0.42)",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#AEA3A3",
  },
});
