import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Dimensions, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import SHeader from '../components/sHeader'
import { Asset } from "expo-asset";
import { Card, CardItem, Body,Text } from 'native-base';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Notify extends Component {

  constructor(props){
    super(props)
    this.state={
      isReady:false,
    }
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/main.png")]),
      Font.loadAsync({
        ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
        ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
        ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
        ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
        ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      })
    ]).then(this.setState({ isReady: true }))
    
  }

  render() {
    if (!this.state.isReady){
      return (<AppLoading/>)
    }
    return (
      <ImageBackground source={require("../../assets/main.png")} style={styles.container}>
        <SHeader title={'Notifications'} navig={this.props.navigation} dest={"dashboard"}/>
        <Card style={{width:width-30,}}>
            <CardItem>
              <Body>
                <Text style={{fontFamily:'ProximaReg',fontSize:19,}} >
                   We Found a new Blood Donor near you. Click here to know more.
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card style={{width:width-30,}}>
            <CardItem>
              <Body>
                <Text style={{fontFamily:'ProximaReg',fontSize:19,}} >
                   No new Notifications
                </Text>
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
    alignItems:'center'
  }
});
