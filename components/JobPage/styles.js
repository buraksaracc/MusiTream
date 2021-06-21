import { StyleSheet } from "react-native";

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
  more: {
    position: "absolute",
    marginTop: 50,
    marginStart: 330,
    marginHorizontal: 16,
  },
  pageTitle:{
    position:"absolute",
    justifyContent:"center",
    marginHorizontal:16,
    marginTop:35,
    marginStart:80,
    marginBottom:30,
    
  },
  profilePic: {
    marginTop: 20,
    marginLeft: 20,
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
  },
  aligning: {
    alignSelf: "center",
  },
  
  image: {
    flex:1,
    width: 100,
    height: undefined,
  },
  postPic:{
      alignSelf:"center",
      marginTop: 24,
    width: 270,
    height: 170,
    borderRadius: 100,
  },
  image1: {
      alignSelf: "center",
    flex:1,
    width: 300,
    height: undefined,
  },
 apply:{
      marginLeft:280,
      marginTop:15,
      position:"absolute",
  },
  


  aboutJobad:{
      height:180,
      width:380,
    marginLeft:20,
    marginRight:200,
  },
  


  profileBorder: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(53, 48, 61, 1)",
    width: 380,
    height:200,
    marginTop: 90,
  },
  

  
  info: {
    position: "absolute",
    color: "#fff",
    width:250,
   
    marginLeft: 90,
    marginBottom: 60,
    marginTop: 20,
    
  },

  jobtype: {
position:"absolute",
    color: "#CBCBCB",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 1,
    marginTop: 10,
    
  },
  employername: {

    color: "#CBCBCB",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 25,
    marginBottom: 1,
  },
  employertype: {
    marginLeft:25,
    color: "#AAAAAA",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft:95,
    marginTop: 5,
    
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
    textTransform:"uppercase",
    fontWeight: "500",
  },
 
  mediaBorder:{
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#35303D",
    width: 380,
    height: 200,
    marginTop: 10,
  },
  mediaContainer:{
    width:100,
    height:200,
    borderRadius:12,
    overflow:"hidden",
    marginHorizontal:10,

  }
});
export default styles;