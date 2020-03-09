import React, { Component } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import Header from "../components/header";
import Cards from "../components/card";
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      posts: null,
      isLoaded:false,
      font:false,
    };
  }

  async componentDidMount() {
    this.loadPosts();
    await Promise.all([
      Asset.loadAsync([require("../../assets/main.png")]),
      Font.loadAsync({
        ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
        ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
        ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
        ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
        ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      })
    ]).then(this.setState({
      isReady:true,
      font:true
    }))
  }

  // componentWillMount(){
  //   const isFocused = this.props.navigation.state;
  //   console.log(isFocused);
  //   if (isFocused.key == "dashboard") {
  //     console.log("this state nav is ", isFocused.routeName);
  //     BackHandler.addEventListener("hardwareBackPress", function() {
  //       BackHandler.exitApp();
  //     });
  // }}

  // componentWillUnmount() {
  //   const isFocused = this.props.navigation.state;
  //   console.log(isFocused);
  //   if (isFocused.key == "dashboard") {
  //     console.log("this state nav is ", isFocused.routeName);
  //     BackHandler.addEventListener("hardwareBackPress", function() {
  //       BackHandler.exitApp();
  //     });
  //   }
  //   return;
  //   BackHandler.removeEventListener();
  // }
  loadPosts = async () => {
    await firebase
      .database()
      .ref("dash/")
      .once("value")
      .catch(err => Alert.alert(err))
      .then(res => {
        this.setState({ posts: res.val(),isLoaded:true,});
      });
  };

  nav = () => {
    this.props.navigation.navigate("Auth");
  };
  
  render() {
    if (this.state.isReady == false && !this.state.font == false) {
      return <AppLoading />;
    } else {
      return (
        <ImageBackground
          source={require("../../assets/main.png")}
          style={styles.container}
        >
          <Header
            navig={this.props.navigation}
            title={"Explore"}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.isLoaded ? (this.state.posts.map((i, u) => {
              return (
                <Cards
                  title={i.title}
                  image={i.img}
                  des={i.des}
                  nav={this.props.navigation}
                  link={i.link}
                />
              );
            })) : (<ActivityIndicator size="large"/>)}
          </ScrollView>
        </ImageBackground>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: "absolute",
    alignItems: "center"
  }
});
