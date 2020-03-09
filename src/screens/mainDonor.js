import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import SHeader from "../components/sHeader";
import { Asset } from "expo-asset";
import { ScrollView } from "react-native-gesture-handler";
import ProfileCard from "../components/profileCard"


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class MainDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
        Asset.loadAsync([require("../../assets/bg.jpg")]),
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

    const name = this.props.navigation.getParam("name", "");
    const age = this.props.navigation.getParam("age", "");
    const gender = this.props.navigation.getParam("gender", "");
    const region = this.props.navigation.getParam("region", "");
    const bloodGroup = this.props.navigation.getParam("bloodGroup", "");
    const number = this.props.navigation.getParam("number", "");
    const mediBg = this.props.navigation.getParam("mediBg", "");

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.container}
      >
        <SHeader
          title="Donor's Detail"
          navig={this.props.navigation}
          dest={"donor"}
        />
        <View style={styles.v1}>
        <Ionicons name="md-person" size={105} color={"white"} />
        </View>
        <View style={styles.v2}>
          <ScrollView style={{marginTop:15,}}>
            <ProfileCard icon="ios-person" dis={name} title={'Name of Donor'}/>
            <ProfileCard icon="md-transgender" dis={gender} title={'Gender'}/>
            <ProfileCard icon="ios-water" dis={bloodGroup} title={'Blood Group'}/>
            <ProfileCard icon="ios-body" dis={age} title={'Age'}/>
            <ProfileCard icon="md-medkit" dis={mediBg.substring("...",30)+"....."} title={'Medical Background'}/>
            <ProfileCard icon="md-navigate" dis={region} title={'Region'}/>
            <ProfileCard icon="md-call" dis={number} title={'Mobile Number'}/>
          </ScrollView>
        </View>
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
  },
  v1: {
    width: width,
    flex: 0.20,
    alignItems: "center",
    justifyContent: "center"
    //   backgroundColor:'red'
  },
  v2: {
    flex: 0.80,
    width: width-20,
    backgroundColor:'white',
    alignItems: "center",
    justifyContent: "center",
    margin:30,
    borderRadius:10,
  }
});
