import { StyleSheet } from "react-native";

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
  more: {
    position: "absolute",
    marginTop: 60,
    marginStart: 330,
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
    marginTop: 20,
    marginLeft: 108,
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  aligning: {
    alignSelf: "center",
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(195, 183, 255, 0.42)",
    width: 315,
    height: 238,
    marginTop: 43,
  },
  add: {
    position: "absolute",
    marginLeft: 178,
    marginTop: 95,
  },
  info: {
    color: "#fff",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 5,
  },
  username: {
    color: "#CBCBCB",
    fontSize: 25,
    fontWeight: "700",
  },
  usertype: {
    color: "#AAAAAA",
    fontSize: 12,
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#CBCBCB",
    fontWeight: "400",
  },
  subText: {
    color: "#CBCBCB",
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  aboutBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(123, 97, 255, 0.5)",
    width: 285,
    height: 74,
    marginTop: 15,
  },
  mediaBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#35303D",
    width: 390,
    height: 200,
    marginTop: 15,
    marginBottom: 20,
  },
  mediaContainer: {
    borderWidth: 1,
    borderColor: "#383838",
    marginLeft: 40,
    marginTop: 30,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  navbar: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 5,
  },
  contentCounter: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    position: "absolute",
    width: 50,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  audioContent: {
    borderWidth: 1,
    borderColor: "#CBCBCB",
    backgroundColor: "rgba(195, 183, 255, 0.42)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 100,
    height: 140,
   
  },
  audioBorder: {
   
    textAlign: "center",
    width: 100,
    height: 180,
    alignItems: "center",
    alignSelf:"center",
    marginTop: 25,
    marginLeft: 40,
  
  },
  audioInfo: {
    textAlign:"center",
    color: "#CBCBCB",
    fontSize: 10,
    fontWeight: "500",
  },
});
export default styles;
