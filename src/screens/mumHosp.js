import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Linking
} from "react-native";
import SHeader from '../components/sHeader'
import { Asset } from "expo-asset";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AppLoading , } from "expo";

import { Ionicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Mumbai extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      hosp:[
        {name:'Bombay Hospital & Research Centre',link:'https://www.bombayhospital.com'},
        {name:'Breach Candy Hospital',link:'https://www.breachcandyhospital.org'},
        {name:'Hinduja National Hospital',link:'https://www.hindujahospital.com'},
        {name:'Hiranandani Hospital',link:'https://www.hiranandanihospital.org'},
        {name:'Jaslok Hospital',link:'https://www.jaslokhospital.net'},
        {name:'Kolitaben Dhirubhai Ambani Hospital',link:'https://www.kokilabenhospital.com/'},
        {name:'Lilavati Hospital',link:'https://www.lilavatihospital.com'},
        {name:'Tata Memorial Hospital',link:'https://tmc.gov.in'},
        {name:'Wockhardt Hospitals',link:'https://www.wockhardthospitals.com'},
      ]
    }
  }

  async componentDidMount() {
    await Promise.all([
      Asset.loadAsync([require("../../assets/bg.jpg")])
      // Font.loadAsync({
      //   ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //   ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //   ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //   ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //   ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      // })
    ]);
    this.setState({
      isReady:true,
    })
  }
 
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/bg.jpg")}
      >
        <SHeader title="Welcome" navig={this.props.navigation} dest={"map"} />
        <Text style={{fontFamily:'ProximaBold',fontSize:27,color:'white'}}>Best Hospitals in Mumbai</Text>
        <View style ={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.hosp.map((i, h) => {
            return (
              <View style={styles.hosp}>
                
                <TouchableOpacity style={{ flexDirection:'row',flexGrow:1}} onPress={()=>{
                  Linking.openURL(i.link)
                }}>
                <Ionicons name="md-medkit" size={50} color={"red"} />
                <View>
                <Text style={{marginLeft:5,color:'#000',fontSize:20,flexWrap:'wrap'}}>{i.name}</Text>
                <Text style={{marginLeft:5,color:'gray',fontSize:16,flexWrap:'wrap'}}>Click Here to Know More.</Text>
                </View>
               
                </TouchableOpacity>
                
              </View>
            );
          })}
        </ScrollView>
        </View>
       
        {
          
        }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
   flex:1,
    alignItems: "center"
  },
  map: {
    height: height / 1.8,
    width: width - 20,
    borderRadius: 10
  },
  hosp: {
    margin: 2,
    padding: 5,
    width: width - 25,
    height: height / 8,
    flexWrap:'wrap'
  },
  main:{
    backgroundColor:'white',
    margin:10,
  }
});
