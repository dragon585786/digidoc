import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import SHeader from "../components/sHeader";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Linking } from 'expo'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Aid extends Component {
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
    const name = this.props.navigation.getParam("name", "");
    const des = this.props.navigation.getParam("des", "");
    const imgURL = this.props.navigation.getParam("imgURL", "");
    const cure = this.props.navigation.getParam("cure", "");
    const symptom = this.props.navigation.getParam("symptom", "");
    const symptom1 = this.props.navigation.getParam("symptom1", "");
    const symptom2 = this.props.navigation.getParam("symptom2", "");
    const symptom3 = this.props.navigation.getParam("symptom3", "");
    const pre = this.props.navigation.getParam("pre", "");
    const pre1 = this.props.navigation.getParam("pre1", "");
    const pre2 = this.props.navigation.getParam("pre2", "");
    const pre3 = this.props.navigation.getParam("pre3", "");

    const symptoms = [symptom,symptom1,symptom2,symptom3]
    const prec = [pre,pre1,pre2,pre3]

    return (
      <ImageBackground
        source={require("../../assets/profile.png")}
        style={styles.container}
      >
        <SHeader navig={this.props.navigation} dest={"FirstAid"} title={name} />
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: imgURL }} style={styles.img} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
          </View>

         
          <View style={styles.symptom}>
            <Text style={styles.tText}>Symptoms</Text>
            {symptoms.map((u,i)=>{
              {/* console.log("THis is "+ u ) */}

            if (u == undefined){
              console.log(u)
            } else {
            return <Text style={styles.dText}>
              <Ionicons
                name="md-information-circle-outline"
                size={20}
                color="black"
              />{" "}
              {u}
            </Text>
            }
          })}

          </View>

          <View style={styles.symptom}>
            <Text style={styles.tText}>Precautions</Text>
            {prec.map((u,i)=>{
              {/* console.log("THis is "+ u ) */}

            if (u == undefined){
              console.log(u)
            } else {
            return <Text style={styles.dText}>
              <Ionicons
                name="md-information-circle-outline"
                size={20}
                color="black"
              />{" "}
              {u}
            </Text>
            }
          })}
          </View>

          <View style={styles.cure}>
            <Text style={styles.tText}>Cure</Text>
            <Text style={styles.dText}>
              <Ionicons
                name="md-information-circle-outline"
                size={20}
                color="black"
              />{" "}
              {cure}
            </Text>
          </View>
          <View style={{alignItems:'center',margin:20,}}>
              <TouchableOpacity style={styles.link} onPress={()=>this.redirect()}>
                <Text style={{textAlign:'center',fontFamily:'ProximaBold',fontSize:20,}}>For More information Click here</Text>
              </TouchableOpacity>
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
