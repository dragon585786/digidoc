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

export default class Maap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      hosp: [
        {name:"Guru Nanak Hospital @ 1.1 KM",link:"https://www.gurunanakhospital.com/"},
        
        {name:"Sanjeevni Hospital @ 1.6 KM ",link:"https://www.justdial.com/Mumbai/Sanjeevan-Hospital-in-Bandra-West/nct-12144337"},
        {name:"Asian Heart Institue @ 2.6 KM",link:"http://www.asianheartinstitute.org/"},
        {name:"Niron Hospital @ 3.7KM",link:"https://www.justdial.com/Mumbai/Niron-Hospital-Research-Centre-Pvt-Ltd-Near-Vishwakarma-Hall-KalinaKadam-Wadi-Behind-Vakola-Masjid-Santacruz-East/022PK003370_BZDET"},
        {name:"Bhabha Hosptial @ 2.6KM",link:"https://www.justdial.com/Mumbai/Bhabha-Hospital-Near-Globus-Mall-Bandra-West/022P100117_BZDET"},
        {name:"VN Desai Hospital @ 2.5 KM",link:"https://www.justdial.com/Mumbai/V-N-Desai-Municipal-Hospital-Opposite-Roop-Cinema-Santacruz-Gymkhana-TPS-3-Santacruz-East/022P8402095_BZDET"},
        {name:"Railway Hospital @ 2.1KM",link:"https://www.justdial.com/Mumbai/Sub-Divisional-Railway-Hospital-Besides-Gaiety-Galaxy-Bandra-West/022PXX22-XX22-000946133407-N3G1_BZDET"},
        {name:"Shivam Nursing Home @ 1.5KM",link:"https://www.justdial.com/Mumbai/Shivam-Nursing-Hospital-Near-Kherwadi-Police-Station-Govt-Colony-Bandra-Bandra-East/022PXX22-XX22-111029135528-W7T8_BZDET"}
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
        <Header title="Hospitals" navig={this.props.navigation} dest={"Mum"} iconName={"ios-star"} text={"Top 10"}/>
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
