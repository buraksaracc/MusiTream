import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function LiveStream() {
  return (
    <ScrollView style={styles.container}>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.arrowBack}>
          <Ionicons name="chevron-back-outline" color="#CBCBCB" size={40} />
        </TouchableOpacity>

        <View style={styles.pageTitle}>
          <Text style={{ color: "#CBCBCB", fontSize: 25, fontWeight: "600" }}>
            Stream&Podcast
          </Text>
        </View>

        <View style={styles.streamBorder}>
          <View style={styles.containerStream}>
            <View style={styles.profileBorder}>
              <View style={styles.profilePic}>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person6.jpg?token=AOXCJECPOJVTMCRMFMD3VSDA54ADG",
                  }}
                  style={styles.image}
                ></Image>
              </View>
              <TouchableOpacity style={styles.play}>
                <Ionicons name="play" size={35} color="#7B61FF"></Ionicons>
              </TouchableOpacity>
              <Text style={styles.userName}> Go Live</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Write something about your stream!"
              placeholderTextColor="#656565"
            ></TextInput>
          </View>
          <Text
            style={{
              color: "#CBCBCB",
              fontSize: 18,
              marginLeft: 20,
              marginTop: 15,
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            Current Streamers
          </Text>

          <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
            <View style={styles.containerStream}>
              <View style={styles.profileBorder}>
                <View style={styles.profilePic}>
                  <Image
                    source={{
                      uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person2.jpg?token=AOXCJEEL26UJOI3XPNV5UH3A5377M",
                    }}
                    style={styles.image}
                  ></Image>
                </View>
                <TouchableOpacity style={styles.play}>
                  <Ionicons name="play" size={35} color="#7B61FF"></Ionicons>
                </TouchableOpacity>
                <Text style={styles.userName}> Arthur Stinson</Text>
              </View>

              <Text style={styles.streamer}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <View style={styles.containerStream}>
              <View style={styles.profileBorder}>
                <View style={styles.profilePic}>
                  <Image
                    source={{
                      uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person3.jpg?token=AOXCJEG5KGEQ45A7KXPGWC3A54ABI",
                    }}
                    style={styles.image}
                  ></Image>
                </View>
                <TouchableOpacity style={styles.play}>
                  <Ionicons name="play" size={35} color="#7B61FF"></Ionicons>
                </TouchableOpacity>
                <Text style={styles.userName}>Betty Beep</Text>
              </View>

              <Text style={styles.streamer}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.podcastBorder}>
          <Text
            style={{
              color: "#CBCBCB",
              fontSize: 18,
              marginLeft: 25,
              marginTop: 15,
              fontWeight: "700",
            }}
          >
            Podcasts
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* only the first podcast has the pop up the others are just visual*/}
            <View style={styles.userBorder}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person2.jpg?token=AOXCJEEL26UJOI3XPNV5UH3A5377M",
                  }}
                  style={styles.podcaster}
                  resizeMode="cover"
                ></Image>
                <Text style={styles.audioInfo}>lorem ipsum doler sit amet</Text>
                <Text style={styles.userName}>Charlotte Mai</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userBorder}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person4.jpg?token=AOXCJEECO53W3SQ4VLRQW5LA54AHG",
                  }}
                  style={styles.podcaster}
                  resizeMode="cover"
                ></Image>
                <Text style={styles.audioInfo}>lorem amet</Text>
                <Text style={styles.userName}>RODNAE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userBorder}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person5.jpg?token=AOXCJEDZ47S6WGJVPJQCJBDA54AII",
                  }}
                  style={styles.podcaster}
                  resizeMode="cover"
                ></Image>
                <Text style={styles.audioInfo}>
                  lorem lamet senifytiko ipsum doler sit
                </Text>
                <Text style={styles.userName}>cottonbro</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userBorder}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/buraksaracc/MusiTream/test-branch/person3.jpg?token=AOXCJEG5KGEQ45A7KXPGWC3A54ABI",
                  }}
                  style={styles.podcaster}
                  resizeMode="cover"
                ></Image>
                <Text style={styles.audioInfo}>lorem </Text>
                <Text style={styles.userName}>KarolinaH</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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

  pageTitle: {
    position: "absolute",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 63,
    marginStart: 60,
  },
  profilePic: {
    marginLeft: 20,
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
  },
  play: {
    position: "absolute",
    marginLeft: 60,
    marginTop: 40,
  },

  containerStream: {
    alignSelf: "center",
    width: 380,
    height: 90,
    marginTop: 15,
  },
  userName: {
    color: "#CBCBCB",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  streamBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(53, 48, 61, 1)",
    width: 380,
    height: 350,
    marginTop: 20,
  },
  input: {
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
    marginLeft: 110,
    marginTop: 20,
  },
  profileBorder: {
    width: 100,
    height: 100,
  },
  streamer: {
    color: "#CBCBCB",
    fontSize: 12,
    position: "absolute",
    marginLeft: 110,
    marginTop: 20,
  },
  podcastBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(53, 48, 61, 1)",
    width: 380,
    height: 223,
    marginTop: 30,
    marginBottom: 10,
  },

  userBorder: {
    width: 100,
    height: 170,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 25,
    borderRadius: 12,
  },

  audioInfo: {
    marginTop: 5,
    textAlign: "center",
    color: "#CBCBCB",
    fontSize: 10,
    fontWeight: "500",
  },
  podcaster: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  navbar: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 5,
  },
});
