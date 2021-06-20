import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Settings() {
  return (
    <View style={styles.containerForLanding}>
      <TouchableOpacity style={styles.arrowBack}>
        <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
      </TouchableOpacity>
      
      <View style={styles.pageTitle}>
        <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
          Settings
        </Text>
      </View>
      <View style={styles.margining}>
        <TouchableOpacity style={styles.clickable}>
          <Ionicons
            style={{ position: "absolute", marginLeft: 5 }}
            name="people-circle"
            size={30}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickable}>
          <Ionicons
            style={{ position: "absolute", marginLeft: 5 }}
            name="information-circle"
            size={30}
            color="#CBCBCB"
          ></Ionicons>
          <Text style={styles.settings}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clickable}>
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
