import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Modal from "react-native-modal";

require("firebase");
require("firebase/firestore");

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function Explore({ navigation }) {
  const [jobData, setJobData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    let feed = [];
    firebase
      .firestore()
      .collection("jobAds")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          firebase
            .firestore()
            .collection("users")
            .doc(doc.id)
            .get()
            .then((snapshot2) => {
              const userData = snapshot2.data();
              let key = "";
              const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (let i = 0; i < 10; i++) {
                key += possible.charAt(
                  Math.floor(Math.random() * possible.length)
                );
              }
              if (userData.photo == "" || userData.photo === null) {
                userData.photo =
                  "https://firebasestorage.googleapis.com/v0/b/musitream-98631.appspot.com/o/TempProfilePic.png?alt=media&token=299d97c9-99db-417e-84c9-b97c92b695e3";
              }
              feed.push(Object.assign({}, userData, data, { id: key }));

              setJobData(feed);
            });
        })
      );
  }, [refreshing]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          Job Ads
        </Text>
      </View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={jobData}
        renderItem={({ item }) => (
          <View style={styles.profileBorder}>
            <View style={styles.profilePic}>
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.image}
              ></Image>
            </View>

            <View style={styles.info}>
              <Text style={styles.employername}>{item.name}</Text>
              <Text style={styles.employertype}>{item.type}</Text>
            </View>
            <View></View>
            <View style={styles.aboutJobad}>
              <Text style={styles.jobtype}>{item.jobType}</Text>
              <Text
                style={{
                  color: "#CBCBCB",
                  fontSize: 11,
                  textAlign: "left",
                  width: 250,
                  position: "absolute",
                  marginTop: 40,
                  marginRight: 90,
                }}
              >
                {item.explanation}
              </Text>

              <TouchableOpacity style={styles.apply} onPress={toggleModal}>
                <Ionicons name="play" size={70} color="#7B61FF"></Ionicons>
                <Text
                  style={{
                    color: "#CBCBCB",
                    fontSize: 11,
                    position: "absolute",
                    marginTop: 28,
                    marginLeft: 15,
                  }}
                >
                  Apply
                </Text>
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
                    Send your CV to: {item.email}
                  </Text>
                </View>
              </Modal>
            </View>

            <View style={styles.buttonsContainer}></View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    position: "absolute",
    marginLeft: 10,
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 16,
  },

  pageTitle: {
    position: "absolute",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 35,
    marginStart: 80,
    marginBottom: 30,
  },
  closeButton: {
    color: "#CBCBCB",
    marginLeft: 315,
  },
  profilePic: {
    marginTop: 20,
    marginLeft: 20,
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
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

  image: {
    flex: 1,
    width: 100,
    height: undefined,
  },

  apply: {
    marginLeft: 280,
    marginTop: 15,
    position: "absolute",
  },

  aboutJobad: {
    height: 180,
    width: 380,
    marginLeft: 20,
    marginRight: 200,
  },

  profileBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(53, 48, 61, 1)",
    width: 380,
    height: 200,
    marginTop: 90,
  },

  info: {
    position: "absolute",
    color: "#fff",
    width: 250,

    marginLeft: 90,
    marginBottom: 60,
    marginTop: 20,
  },

  jobtype: {
    position: "absolute",
    color: "#CBCBCB",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 1,
    marginTop: 10,
  },
  employername: {
    color: "#CBCBCB",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 25,
    marginBottom: 1,
  },
  employertype: {
    marginLeft: 25,
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "400",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 95,
    marginTop: 5,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
});
