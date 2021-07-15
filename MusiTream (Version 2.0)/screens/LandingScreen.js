import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export function Landing({ navigation }) {
  return (
    <View style={styles.containerForLanding}>
      <View>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View>
          <Text style={styles.logoName}>MusiTream </Text>
          <Text style={styles.info}>
            Explore fresh auditory content, stream yours, spread the love of
            music.
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Buttons
          type="primary"
          content={"Create an account"}
          onPress={() => navigation.navigate("Register")}
        />
        <Buttons
          type="secondary"
          content={"Sign in"}
          onPress={() => navigation.navigate("Login")}
        />
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
  buttons: {
    position: "absolute",
    width: "100%",
    bottom: 50,
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
    width: 178,
    height: 148,
  },
  logoName: {
    textAlign: "center",
    width: "100%",
    marginTop: "10%",
    fontWeight: "800",
    fontSize: 38,
    color: "#AEA3A3",
  },
  info: {
    fontWeight: "300",
    fontSize: 25,
    textAlign: "center",
    marginTop: "15%",
    color: "#847A7A",
  },
});
