import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Header from "../components/header";
import { Asset } from "expo-asset";
import { Card, CardItem, Body, Text } from "native-base";
import ProfileCard from "../components/profileCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/bg.jpg")])
      //   Font.loadAsync({
      //     ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //     ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //     ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //     ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //     ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      //   })
    ]).then(this.setState({ isReady: true }));
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.container1}
      >
        <Header title={"Contact Us"} navig={this.props.navigation} />
        <View style={styles.main1}>
          <ScrollView>
            <ProfileCard
              icon="ios-person"
              dis={"digitaldoctor00@gmail.com"}
              title={"Digital Doctor"}
            />

            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                Linking.openURL("https://github.com/dragon585786/digidoc");
              }}
            >
              <View style={styles.main}>
                <View style={styles.icon}>
                  <Ionicons name={"logo-github"} size={27} color="#916dd5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    justifyContent: "center",
                    flexShrink: 1
                  }}
                >
                  <Text style={{ color: "gray" }}>{"GitHub"}</Text>
                  <Text style={styles.text}>
                    {"Click here for Source code"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.last}>
              <Text style={styles.text1}>Find Us On </Text>
              <View style={styles.icon1}>
                  <Ionicons name={"logo-instagram"} style={{marginHorizontal:10}} size={27} color="#916dd5" />
                  <Ionicons name={"logo-facebook"} style={{marginHorizontal:10}} size={27} color="#916dd5" />
                  <Ionicons name={"logo-twitter"} style={{marginHorizontal:10}} size={27} color="#916dd5" />
                  <Ionicons name={"logo-youtube"} style={{marginHorizontal:10}} size={27} color="#916dd5" />
                  <Ionicons name={"logo-wordpress"} style={{marginHorizontal:10}} size={27} color="#916dd5" />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    height: height,
    width: width,
    position: "absolute",
    alignItems: "center"
  },
  main1: {
    backgroundColor: "white",
    width: width - 20,
    padding: 5,
    margin: 20,
    borderRadius: 10
  },
  container: {
    height: height / 8.8,
    width: width - 20,
    marginLeft: 15,
    marginTop: 10
    // backgroundColor:'red'
  },
  main: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "ProximaReg",
    fontSize: 21
  },
  icon: {
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 85
  },
  icon1: {
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 85,
    flexDirection: "row",
    margin:5, 
  },
  text1: {
    fontFamily: "ProximaReg",
    fontSize: 25,
    margin:5,
  },
  last: {
    alignItems: "center",
    margin:20,
  }
});
