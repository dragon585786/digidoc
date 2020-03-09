import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar,
  Alert
} from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
//import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import * as Font from 'expo-font'
import { AppLoading } from "expo";


export default class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayName: "",
      photoURL: null,
      isLoggedIn: null,
      isFontLoaded:false,
    };
  
  }

  async componentDidMount() {
    await Font.loadAsync({
      ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
    }).then( this.setState({isFontLoaded:true,}))
   

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("users/")
          .child(user.uid)
          .once("value")
          .catch(err => Alert.alert(err.code))
          .then(user => {
            this.setState({
              displayName: user.val().displayName,
              photoURL: user.val().photoURL,
              isLoggedIn: true
            });
          });
        //console.log(user.uid);
      } else {
        this.setState({
          displayName: "Guest",
          isLoggedIn: false
        });
      }
    });
  }

  render() {

    const { isLoggedIn,photoURL,displayName } = this.state;
    if (!this.state.isFontLoaded){
      <AppLoading/>
    }
    return (
      <ScrollView>
        <StatusBar barStyle="default" translucent animated />
        <ImageBackground
          source={require("../../assets/background.png")}
          style={{ width: undefined, padding: 16, paddingTop: 48 }}
        >
          {isLoggedIn ? (
            <Image
              source={{ uri: photoURL }}
              style={styles.profile}
            />
          ) : (
            <Image source={require("../../assets/profile-pic.jpg")} style={styles.profile} />
          )}

          <Text style={styles.name}>{displayName}</Text>
        </ImageBackground>

        <View
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <DrawerNavigatorItems {...this.props} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  name: {
    fontFamily:'ProximaBold',
    color: "#FFF",
    fontSize: 25,
    fontWeight: "800",
    marginVertical: 8
  }
});
