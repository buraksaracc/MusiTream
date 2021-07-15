import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogIn } from "./screens/LoginScreen";
import { Register } from "./screens/RegisterScreen";
import { MyTabs } from "./screens/HomeScreen";
import { Chats } from "./otherComponents/Chats";
import { ImagePickFromGallery } from "./otherComponents/addPhoto";
import { uploadFromCamera } from "./otherComponents/addPhoto";
import { MEDIA } from "./otherComponents/Audio/Media";
import { auth } from "./firebaseConnection.js";
import { LogBox, View, Image } from "react-native";
import { Landing } from "./screens/LandingScreen";
import { Comments } from "./otherComponents/Comments";
import { ProfileSettings } from "./otherComponents/ProfileSettings";
import { Settings } from "./otherComponents/Settings";
import { Addpost } from "./otherComponents/AddPost";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super();
    LogBox.ignoreLogs(["Setting a timer for a long period of time,"]);
    this.state = {
      appLoaded: false,
      loggedIn: false,
      follows: "A",
    };
  }
  componentDidMount() {
    LogBox.ignoreAllLogs();
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({
          loggedIn: true,
          appLoaded: true,
        });
      } else {
        this.setState({
          appLoaded: true,
          loggedIn: false,
        });
      }
    });
  }
  render() {
    if (!this.state.appLoaded) {
      return (
        <View>
          <Image
            source={require("./assets/splashIcon.png")}
            style={{
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        </View>
      );
    }
    if (!this.state.loggedIn) {
      return (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationTypeForReplace: "pop",
              }}
              initialRouteName="Landing"
            >
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={LogIn} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      );
    }

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={MyTabs} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="AddPost" component={Addpost} />
            <Stack.Screen name="FromCamera" component={uploadFromCamera} />
            <Stack.Screen name="FromGallery" component={ImagePickFromGallery} />
            <Stack.Screen name="MediaLibAudio" component={MEDIA} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
