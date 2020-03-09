import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import SHeader from "../components/sHeader";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from 'expo';
 


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Post extends Component {
  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/profile.png")])
      // Font.loadAsync({
      //   ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //   ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //   ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //   ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //   ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      // })
    ]);
  }

  redirect = () => {
    console.log(this.props.navigation.getParam("link", ""))
    var link =  this.props.navigation.getParam("link","")
    if (link == undefined){
      var link = "https://google.com/" 
    }else {
      Linking.openURL(link);
    }
  }

  render() {
    const title = this.props.navigation.getParam("title", "some value");
    const des = this.props.navigation.getParam("des", "some value");
    const img = this.props.navigation.getParam("img","some value");
    // const link = this.props.navigation.getParam("link","some random link")

    
    // console.log("this is "+img)
    return (
      <ImageBackground
        source={require("../../assets/profile.png")}
        style={styles.container}
      >
        <SHeader navig={this.props.navigation} dest={"dashboard"} title={title} />
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: img }} style={styles.img} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.des}>
            <Text style={styles.tText}>Description</Text>
            <Text style={styles.dText}>
              <Ionicons
                name="md-information-circle-outline"
                size={20}
                color="black"
              />{" "}
              {des}
            </Text>
            <View style={{alignItems:'center',marginTop:20,}}>
              <TouchableOpacity style={styles.link} onPress={()=>this.redirect()}>
                <Text style={{textAlign:'center',fontFamily:'ProximaBold',fontSize:20,}}>For More information Click here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: "absolute"
  },
  img: {
    height: height / 3,
    width: width - 20,
    borderRadius: 10
  },
  des: {
    margin: 15,
    flexWrap: "nowrap"
  },
  symptom: {
    margin: 15,
    flexWrap: "nowrap"
  },
  cure: {
    margin: 15,
    flexWrap: "nowrap"
  },
  tText: {
    fontFamily: "ProximaBold",
    fontSize: 27
  },
  dText: {
    fontFamily: "ProximaReg",
    fontSize: 20
  },
  link:{
    backgroundColor:'#efb1ff',
    padding:4,
    width:width-70,
    borderRadius:10,
    elevation:2,
  }
});
