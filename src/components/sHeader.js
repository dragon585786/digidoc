import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from 'expo-font';
const high = Dimensions.get("window").height;

export default class SHeader extends Component {

  constructor(props){
    super(props)
    this.state={
      isReady:false,
    }
  }
  
  async componentDidMount(){
    await Font.loadAsync({
      ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
    }).then ( this.setState({isReady:true}))
   
  }

  render() {
    if (!this.state.isReady){
      return (<AppLoading/>)
    }
    return (
      <View style={style.container}>
        <View style={{ paddingTop: Expo.Constants.statusBarHeight }}></View>
        <StatusBar barStyle="default" />
        <Ionicons
          style={style.icons}
          name="md-arrow-back"
          size={32}
          onPress={() => this.props.navig.navigate(this.props.dest)}
          color="#fff"
        />
        <Text style={style.text}>{this.props.title}</Text>
      </View>
      
    );
  }
}

const style = StyleSheet.create({
  container: {

    backgroundColor: "rgba(255,255,255,0)",
    height: high / 9.5,
    flexDirection: "row",
    marginBottom: 10
  },
  text: {
    flex: 1,
    alignItems: "flex-start",
    fontFamily:'ProximaBold',
    fontSize: 27,
    color: "#fff",
    fontWeight: "900",
    marginTop: Expo.Constants.statusBarHeight + 7
  },
  icons: {
    marginLeft: 10,
    flex: 0.13,
    marginTop: Expo.Constants.statusBarHeight + 7
  }
});
