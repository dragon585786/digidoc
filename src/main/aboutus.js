import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Header from "../components/header";
import { Asset } from "expo-asset";
import { Card, CardItem, Body, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class AboutUs extends Component {
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
        style={styles.container}
      >
        <Header
          title={"About Us "}
          navig={this.props.navigation}
          dest={"dashboard"}
        />
        <Card style={{ width: width - 30 }}>
          <CardItem>
            <Body>
              <ScrollView>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  Digital Doctor beta-1.0.0
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  {}
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  Developed by -- Salim , Mueez, Tasneem, Nida & Arham
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  {}
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                Address : 49, Ali Yavar Jung Marg, Kherwadi, Bandra East, Mumbai,
                  Maharashtra 400051.
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  {}
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  We Developed this application for informational,educational &
                  research purpose only. The information provided on the app
                  isn't intended to replace a trip to your doctor. It's not
                  meant to be part of the "cure, treatment, or prevention" of
                  any disease. As a result, if you rely solely on this app's
                  information to make important medical decisions, the Digital
                  Doctor Team isn't responsible.
                </Text>
                
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  {""}The application is still in development phase , for any
                  feedback or bug report please contact us.
                </Text>
                <Text style={{ fontFamily: "ProximaReg", fontSize: 19 }}>
                  {}
                </Text>
    
              </ScrollView>
            </Body>
          </CardItem>
        </Card>
      </ImageBackground>
    );
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
