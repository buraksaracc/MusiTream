import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
//import { Input } from "react-native-elements";
import { auth, db } from "../firebaseConnection";

export function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        db.collection("users").doc(auth.currentUser.uid).set({
          name,
          email,
        });
        authUser.user.updateProfile({ displayName: name });
      })
      .catch((error) => alert(error.message));
  };
  const myAlert = () =>
    Alert.alert(
      "   ",
      "Register successful",
      [{ text: "OK" }, navigation.navigate("Login")],
      {
        cancelable: true,
      }
    );
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={styles.containerForLanding}>
        <View>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <View>
            <Text style={styles.signUp}>Sign Up </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TextInput
            style={styles.inputs}
            placeholder=" Username"
            placeholderTextColor="rgba(174, 163, 163, 0.6)"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputs}
            placeholder=" E-mail"
            placeholderTextColor="rgba(174, 163, 163, 0.6)"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputs}
            placeholder=" Password"
            placeholderTextColor="rgba(174, 163, 163, 0.6)"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.inputs}
            placeholder=" User Type"
            placeholderTextColor="rgba(174, 163, 163, 0.6)"
            //onChangeText={(val) => setName(val)}
          />
          <Buttons type="primary" content={"Register"} onPress={register} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const Buttons = (props) => {
  const { type, content, onPress } = props;

  const backgroundColor =
    type === "primary" ? "rgba(123, 97, 255, 0.5)" : "#464146";

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.signUpButton, { backgroundColor }]}
        onPress={() => onPress()}
      >
        <Text style={styles.buttonText}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    position: "absolute",
    width: "100%",
    top: 350,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  containerForLanding: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  logo: {
    alignSelf: "center",
    marginTop: "25%",
    width: 146,
    height: 122,
  },
  signUp: {
    textAlign: "center",
    width: "100%",
    marginTop: "10%",
    fontWeight: "800",
    fontSize: 30,
    color: "#AEA3A3",
  },
  inputs: {
    borderWidth: 1,
    color: "white",
    borderColor: "#7B61FF",
    padding: 8,
    margin: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  clickable: {
    marginTop: 30,
    color: " rgba(174, 163, 163, 0.6)",
    alignSelf: "center",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    padding: 13,
  },
  signUpButton: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#AEA3A3",
  },
});
