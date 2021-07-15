import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ColorArray,
  GradientValues,
  GradientStyle,
} from "../otherComponents/SharedDesign";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";

require("firebase/firestore");

export function Search({ navigation }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .onSnapshot((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          console.log(data.photo);
          if (data.photo == "" || data.photo === null) {
            data.photo =
              "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/TempProfilePic.png?alt=media&token=299d97c9-99db-417e-84c9-b97c92b695e3";
          }
          return { id, ...data };
        });
        setUsers(users);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>

      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Explore
        </Text>
      </View>
      <View style={styles.search}>
        <TextInput
          style={{ padding: 8, fontSize: 12, fontWeight: "500" }}
          placeholder="Search..."
          placeholderTextColor="#656565"
          onChangeText={(search) => fetchUsers(search)}
        />
        <Ionicons
          style={{ position: "absolute", marginLeft: 75, marginTop: 5 }}
          name="search"
          color="#CBCBCB"
          size={15}
        />
      </View>

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <View style={styles.exploreBorder}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  uid: item.id,
                })
              }
            >
              <View style={styles.info}>
                <Text style={styles.username}>{item.name}</Text>
                <Text style={styles.usertype}>{item.type}</Text>
              </View>

              <View style={styles.profilePic}>
                <Image
                  source={{
                    uri: item.photo,
                  }}
                  style={styles.image}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
  search: {
    marginLeft: 260,
    position: "absolute",
    marginTop: 70,
    width: 100,
    height: 30,
    borderColor: "#CBCBCB",
    borderWidth: 0.3,
    borderRadius: 12,
  },
  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 63,
    marginStart: 60,
  },
  profilePic: {
    marginTop: 15,
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
  },
  mediaBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(195, 183, 255, 0.42)",
    width: 340,
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  exploreBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#35303D",
    width: 340,
    height: 75,
    marginTop: 10,
  },

  info: {
    color: "#fff",
    marginTop: 18,
    position: "absolute",
    marginLeft: 80,
  },
  username: {
    color: "#CBCBCB",
    fontSize: 13,
    fontWeight: "700",
  },
  usertype: {
    color: "#AAAAAA",
    fontSize: 12,
    fontWeight: "400",
  },
  contentBorder: {
    backgroundColor: "rgba(195, 183, 255, 0.42)",
  },
  mediaContainer: {
    borderWidth: 0.5,
    borderColor: "#383838",
    marginLeft: 35,
    marginTop: 35,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
});
