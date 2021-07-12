import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FromGallery() {
  return (
    <View style={styles.containerForLanding}>
      <TouchableOpacity style={styles.arrowBack}>
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>
      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Comment
        </Text>
      </View>
      <View style={{marginTop:30}}>
      <View style={styles.comment}>
        <Image
          source={require("../../assets/person1.jpg")}
          style={styles.profilePic}
        ></Image>

        <Text style={styles.username}>Opia</Text>

        <View>
          <Text style={styles.commentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </View>
      <View style={styles.comment}>
        <TextInput
          style={{ padding: 8, fontSize: 12, fontWeight: "500" }}
          placeholder="Write something to comment!"
          placeholderTextColor="#656565"
        />
      </View>
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
  commentText: {
    color: "#CBCBCB",
    fontSize: 12,
    padding: 10,
    marginLeft: 50,
    marginTop: 20,
    width: 250,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",

  },
  username: {
    color: "#CBCBCB",
    fontSize: 14,
    fontWeight: "700",
    position: "absolute",
    marginLeft: 60,
  },

  comment: {
    alignSelf: "center",
    marginTop: 10,
    width: 300,
    height: 100,
    borderColor: "#CBCBCB",
    borderWidth: 0.3,
    borderRadius: 12,
    
  },

  postButton: {
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#7B61FF",
    width: 150,
  },
  postText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#CBCBCB",
  },
});
