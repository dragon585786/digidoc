import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
  Image
} from "react-native";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AppLoading } from "expo";
import * as Font from 'expo-font';

const dimen = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
    }).then (  this.setState({ isReady: true }))
  
  }

  render() {
    var title = this.props.title;
    var des = this.props.des;
    var imgURL = this.props.image;
    var link = this.props.link;
    console.log("im from card"+link)
    if (!this.state.isReady){
      return (<AppLoading/>)
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() =>
          this.props.nav.navigate("Posts", {
            title: title,
            des: des,
            img: imgURL,   
            link: link,
          })
        }>
          <View style={styles.img}>
            <Image
              source={{ uri: this.props.image }}
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7
              }}
            />
          </View>

          <LinearGradient
            colors={["#fff", "#fff"]}
            style={styles.textDes}
          >
            <Text style={styles.text}>{this.props.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  card: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    height: high / 2.7 - 20,
    width: dimen - 20,
    borderRadius: 7,
    marginBottom: 10,
    elevation: 3
  },
  text: {
    fontFamily:'ProximaBold',
    fontSize: 20,
    fontWeight: "900",
    //textAlign: "center",
    color: "black"
  },
  description: {},
  img: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textDes: {
    // backgroundColor: "red",
    flex: 0.25,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  }
});
