import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";

export default function FromGallery() {
  return (
    <View style={styles.containerForLanding}>
      <View style={styles.addPost}>
        <Text style={styles.addPostText}>About:</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Write something about your post!"
          placeholderTextColor="#656565"
        />
        {/* bunu sonra unvisible edersin sende de öyleydi sanırım */}
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postText}>SELECT MEDIA</Text>
        </TouchableOpacity>

        {/* bunu select butonundan sonra visible edersin en kötü */}
        <Text style={styles.addPostText}>Media:</Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/random1.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postText}>POST</Text>
        </TouchableOpacity>
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
  inputs: {
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
    marginLeft: 98,
    marginTop: 15,
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
  postText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#CBCBCB",
  },
});
