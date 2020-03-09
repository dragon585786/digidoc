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
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import Header from "../components/header";
import { Asset } from "expo-asset";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { AppLoading , } from "expo";

import { Ionicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Blood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      hosp: [
        {name:"Bloodline Charitable Blood Bank",link:"https://www.justdial.com/Mumbai/Bloodline-Charitable-Blood-Bank-Near-Vikas-Palms-Thane-West/022PXX22-XX22-130928164437-X8R4_BZDET?xid=TXVtYmFpIDI0IEhvdXJzIEJsb29kIEJhbmtzIEJhbmRyYSBXZXN0"},
        
        {name:"Sion Blood Bank",link:"https://www.justdial.com/Mumbai/Sion-Blood-Bank-Opposite-Sion-Bus-Depot-Near-H-P-Petrol-Pump-Sion/022PXX22-XX22-140602140006-P8C1_BZDET"},
        {name:"S L Raheja Blood Bank",link:"https://www.justdial.com/Mumbai/S-L-Raheja-Blood-Bank-Mahim/022PXX22-XX22-120807130312-Z4Y2_BZDET"},
        {name:"Pallavi Blood Bank",link:"https://www.justdial.com/photos/pallavi-blood-bank-govandi-east-mumbai-blood-banks-5ux8r7jg095f0712-pc-111915342-sco-43ve3ddn"},
        {name:"Lokmanya Tssia Blood Bank",link:"https://www.justdial.com/Mumbai/Lokmanya-Tssia-Blood-Bank-Next-To-Thane-Janata-Sahakari-Bank-Wagle-Industrial-Estate-thane-West/022PXX22-XX22-120806134135-L1Q1_BZDET"},
        {name:"K J Somaiya Blood Bank",link:"https://www.justdial.com/Mumbai/K-J-Somaiya-Blood-Bank-Near-Everard-Nagar-Pan-BazarChunnabhati-Sion/022PXX22-XX22-140623143952-M8E5_BZDET"},
        {name:"Sant Nirankari Blood Bank",link:"https://www.justdial.com/Mumbai/Sant-Nirankari-Blood-Bank-Near-Hanuman-Temple-Vile-Parle-East/022PXX22-XX22-160310073734-X9L7_BZDET?xid=TXVtYmFpIDI0IEhvdXJzIEJsb29kIEJhbmtzIEJhbmRyYSBXZXN0"},
        {name:"Samarpan Blood Bank ",link:"https://www.justdial.com/Mumbai/Samarpan-Blood-Bank-Ghatkopar-West/022P8125259_BZDET"}
      ]
    };
  }

  async componentDidMount() {
    await this.getLocationAsync();
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude + '&radius=5000&type=hospitals&key=AIzaSyDozGfBZoQ0B1UJkhWmQsrCTp1w8SUzTF4';
    console.log(url)
    fetch(url)
            .then((response) => response.json())
            .then((JsonResponse) => {
                // console.error(JsonResponse)
                console.log(JsonResponse)
            })
            .catch((error) => {
                alert('error')
            });
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/main.png")])
      // Font.loadAsync({
      //   ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //   ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //   ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //   ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //   ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      // })
    ]);
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 15000
    });

    this.setState({ locationResult: JSON.stringify(location) });

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
    // console.log(this.state.mapRegion);
  };
  render() {
    if (!this.state.mapRegion) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/main.png")}
      >
        <Header title="BloodBanks" navig={this.props.navigation}/>
        <View style={{ borderRadius: 10 ,}}>
          <MapView style={styles.map} region={this.state.mapRegion}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.mapRegion.latitude,
                longitude: this.state.mapRegion.longitude
              }}
              title={"You are Here"}
              description={""}
            />
          </MapView>
        </View>
        <ScrollView>
          {this.state.hosp.map((i, h) => {
            return (
              <View style={styles.hosp}>
                
                <TouchableOpacity style={{ flexDirection:'row',}} onPress={()=>{
                  Linking.openURL(i.link)
                }}>
                <Ionicons name="md-medkit" size={50} color={"red"} />
                <Text style={{margin:10,color:'#000',fontSize:20,}}>{i.name}</Text>
                </TouchableOpacity>
                
              </View>
            );
          })}
        </ScrollView>
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
   
    margin: 10,
    padding: 10,
    width: width - 25,
    height: height / 8,
    backgroundColor: "#f6eedf",
    flexWrap:'wrap'
  }
});
