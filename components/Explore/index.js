import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Explore() {

  return (
    <ScrollView style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.arrowBack}>
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
        />
        <Ionicons style={{position:"absolute",marginLeft:75, marginTop:5}} name="search" color="#CBCBCB" size={15}/>
        </View>
        <View style={styles.exploreBorder}>
          <TouchableOpacity style={styles.profilePic}>
            <Image
              source={require("../../assets/person6.jpg")}
              style={styles.image}
            ></Image>
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.username}>Opia</Text>
            <Text style={styles.usertype}>Producer</Text>
          </View>
          <TouchableOpacity style={styles.apply}>
            <Ionicons name="play" size={50} color="#7B61FF"></Ionicons>
           
          </TouchableOpacity>
       
        </View>
        <View style={styles.exploreBorder}>
          <TouchableOpacity style={styles.profilePic}>
            <Image
              source={require("../../assets/person3.jpg")}
              style={styles.image}
            ></Image>
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.username}>Hatiana Keech</Text>
            <Text style={styles.usertype}>Searching Talents</Text>
          </View>
          <TouchableOpacity style={styles.apply}>
            <Ionicons name="play" size={50} color="#7B61FF"></Ionicons>
           
          </TouchableOpacity>
       
        </View>
        <View style={styles.exploreBorder}>
          <TouchableOpacity style={styles.profilePic}>
            <Image
              source={require("../../assets/person1.jpg")}
              style={styles.image}
            ></Image>
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.username}>Allison Heat</Text>
            <Text style={styles.usertype}>Listener</Text>
          </View>
          <TouchableOpacity style={styles.apply}>
            <Ionicons name="play" size={50} color="#7B61FF"></Ionicons>
           
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
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
    marginLeft:260,
    position:"absolute",
    marginTop:70,
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
    marginTop: 20,
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
  },
  apply: {
    marginLeft: 270,
    marginTop: 25,
    position: "absolute",
  },
  // mediaBorder: {
  //   alignSelf: "center",
  //   borderRadius: 30,
  //   backgroundColor: "rgba(195, 183, 255, 0.42)",
  //   width: 340,
  //   marginTop: 20,
    
  // },
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
    height: 100,
    marginTop: 10,
  },

  info: {
    color: "#fff",
    marginTop: 30,
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
  // contentBorder: {
  //   backgroundColor: "rgba(195, 183, 255, 0.42)",
  // },
  // mediaContainer: {
  //   borderWidth: 0.5,
  //   borderColor: "#383838",
  //   marginLeft: 35,
  //   marginTop: 35,
  //   width: 100,
  //   height: 140,
  //   borderRadius: 12,
  //   overflow: "hidden",
  //   marginHorizontal: 10,
  // },
});
