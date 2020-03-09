import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from "react-native";
import ProfileCard from "../components/profileCard";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import Header from "../components/header";
import { ScrollView } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURL: null,
      displayName: "",
      email: "",
      fontLoaded: false,
      isReady: false,
      isLoggedIn: false,
      uid: null,
      gender:'',
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/profile.png")]),
      // Font.loadAsync({
      //   ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //   ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //   ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //   ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //   ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      // })
    ]);

    this.setState({ fontLoaded: true, isReady: true });

    try {
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
                email: user.val().email,
                uid: user.val().uid,
                photoURL: user.val().photoURL,
                gender:user.val().gender,
                isLoggedIn: true
              }); 
              
            });
        } else {
          this.setState({
            displayName: "Guest",
            email: "guest@guest.com",
            uid: "gussygussy",
            isLoggedIn: false,
            gender:'guest'
          });
        }
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  componentWillUnmount(){
    
  }
  signOut = () => {
    this.setState({
      photoURL: null,
      displayName: null,
      email: null,
      uid: null,
      isLoggedIn: null
    });
    firebase
      .auth()
      .signOut()
      .catch(err => Alert.alert(err.code))
      .then(response => {
        console.log(response);
        this.props.navigation.navigate("Auth");
      });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        source={require("../../assets/profile.png")}
        style={styles.container}
      >
        <Header
          navig={this.props.navigation}
          title={"My Profile"}
          dest={"EditProf"}
          iconName={"md-brush"}
        />
        <View style={styles.img}>
          <View style={{ flex: 0.52, margin: 20, marginTop: 0 }}>
            <Text style={styles.name}>{this.state.displayName}</Text>
          </View>

          <View style={{ flex: 0.5, marginTop: 40 }}>
            <Image source={{ uri: this.state.photoURL }} style={styles.imgM} />
          </View>
        </View>
        <ScrollView style={styles.main}>
          <ProfileCard icon="ios-mail" dis={this.state.email} title={'Email-id'}/>

          <ProfileCard icon="md-people" dis={this.state.gender} title={'Gender'} />

          
        </ScrollView>
        <Button
              title=" Sign Out "
              color="#df42d1"
              onPress={() =>
                this.signOut()
              }
            />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    height: height,
    width: width
  },
  img: {
    flex: 0.65,
    flexDirection: "row",
    width: width
  },
  main: {
    flex: 1
    //backgroundColor: "green"
  },
  imgM: {
    height: 150,
    width: 150,
    backgroundColor: "rgba(246, 195, 229, 1)",
    borderRadius: 80,
    borderWidth: 7,
    borderColor: "rgba(246, 195, 229, 0.5)"
  },
  name: {
    fontFamily: "ProximaBold",
    fontSize: 31,
    color: "#fff"
  }
});
