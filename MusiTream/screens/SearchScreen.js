import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ColorArray,
  GradientValues,
  GradientStyle,
} from "../otherComponents/SharedDesign";
import firebase from "firebase";
import { ScrollView } from "react-native";
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
          return { id, ...data };
        });
        setUsers(users);
      });
  };
  return (
    <LinearGradient
      colors={ColorArray}
      start={GradientValues}
      style={GradientStyle}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{ marginTop: 100 }}
          placeholder="TYPE HERE"
          onChangeText={(search) => fetchUsers(search)}
        />
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  uid: item.id,
                })
              }
            >
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}
