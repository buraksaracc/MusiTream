import firebase from "firebase";
import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignUp = () => {
    console.log(email);
    console.log(password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        Alert.alert("Alert", error.toString());
        console.log(error);
      });
  };
  return (
    <View style={styles.containerForLanding}>
      <View>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View>
          <Text style={styles.signIn}>Sign In </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TextInput
          style={styles.inputs}
          placeholder="Mail"
          placeholderTextColor="rgba(174, 163, 163, 0.6)"
          onChangeText={(mail) => setEmail(mail)}
        />
        <TextInput
          style={styles.inputs}
          placeholder=" Password"
          placeholderTextColor="rgba(174, 163, 163, 0.6)"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Buttons type="primary" content={"Login"} onPress={() => onSignUp()} />
        <Text style={styles.clickable}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: "#AEA3A3", textDecorationLine: "underline" }}
          >
            Sign up here.
          </Text>
        </Text>
      </View>
    </View>
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
  signIn: {
    textAlign: "center",
    width: "100%",
    marginTop: "10%",
    fontWeight: "800",
    fontSize: 30,
    color: "#AEA3A3",
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#7B61FF",
    color: "white",
    padding: 8,
    marginTop: 25,
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
});
