import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export function Settings(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
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
          Settings
        </Text>
      </View>
      <View style={styles.margining}>
        <TouchableOpacity
          style={styles.clickable}
          onPress={() => {
            props.navigation.navigate("ProfileSettings", {
              prop: props.route.params,
            });
          }}
        >
          <Ionicons
            style={{ position: "absolute", marginLeft: 5 }}
            name="people-circle"
            size={30}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity style={styles.clickable} onPress={toggleModal}>
            <Ionicons
              style={{ position: "absolute", marginLeft: 5 }}
              name="information-circle"
              size={30}
              color="#CBCBCB"
            ></Ionicons>
            <Text style={styles.settings}>About Us</Text>
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

          <View>
            <Text style={styles.about}>
              Thanks for downloading our app! This app is developed by 3 music
              lovers to spread the love of the music and bring music lovers
              together. Feel free to contact us via our e-mail for any
              suggestions or problems: musitream@gmail.com {"\u270c"}
            </Text>
          </View>
        </Modal>
        <TouchableOpacity style={styles.clickable} onPress={() => onLogout()}>
          <Ionicons
            style={{ position: "absolute", marginLeft: 5 }}
            name="log-out"
            size={30}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>Log Out</Text>
        </TouchableOpacity>
        <View style={styles.copyright}>
          <Text style={{ color: "#555454" }}>MusiTream {"\u00A9"} 2021</Text>
        </View>
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
  copyright: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 220,
  },
  about: {
    backgroundColor: "rgba(123, 97, 255, 0.5)",
    borderRadius: 12,
    marginLeft: 40,
    marginRight: 15,
    width: 300,
    fontWeight: "700",
    fontSize: 14,
    padding: 20,
    color: "#CBCBCB",
    textAlign: "center",
  },
  closeButton: {
    color: "#CBCBCB",
    marginLeft: 315,
  },
});
