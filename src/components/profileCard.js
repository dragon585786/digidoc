import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Font.loadAsync({
        ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
        ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
        ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
        ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
        ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      })
    ]).then (this.setState({ isReady: true }))
    
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>

        <View style={styles.main}>

          <View style={styles.icon}>
            <Ionicons name={this.props.icon} size={27} color="#916dd5" />
          </View>

          <View style={{ flex:1, marginLeft :10, justifyContent:'center',flexShrink:1,}}>
            <Text style={{color:'gray'}}>{this.props.title}</Text>
            <Text style={styles.text}>{this.props.dis}</Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height/8.8,
    width: width-26,
    marginLeft:15,
    marginTop:10,
    // backgroundColor:'red'
  },
  main: {
    flexDirection: "row",
  },
  text:{
      fontFamily:'ProximaReg',
      fontSize:21,
  },
  icon:{
      justifyContent:'center' ,
      backgroundColor:'white',
      elevation:8,
      padding:10,
      paddingHorizontal:15,
      borderRadius:85, 
    }
});
