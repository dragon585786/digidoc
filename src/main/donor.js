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
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import Header from "../components/header";
import { Asset } from "expo-asset";
import DonorTab from "../components/donors";
import { ScrollView } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donors: null
    };
  }

  async componentDidMount() {
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
    await firebase
      .database()
      .ref("Donors/")
      .once("value")
      .catch(err => Alert.alert(err))
      .then(res => {
        this.setState({ donors: res.val() });
      });

      firebase
      .database()
      .ref()
      .child("Donors/")
      .on("child_changed", res => {
        this.setState({
          donors: res.val()
        });
      });
  }

  render() {
    const { donors } = this.state;

    var card = [];

    for (var key in donors) {
      if (donors.hasOwnProperty(key)) {
        card.push(donors[key]);
        //  console.log('i m new'+donors[key])
      }
    }

    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/main.png")}
      >
        <Header
          title="Donors"
          navig={this.props.navigation}
          dest={"AddDono"}
          iconName="md-add"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {donors != null ? (
            card.map((user, i) => {
              return (
                <DonorTab
                  key={i}
                  name={card[i].name}
                  bloodGroup={card[i].bloodGroup}
                  number={card[i].moNo}
                  gender={card[i].gender}
                  age={card[i].age}
                  mediBg={card[i].mediBg}
                  region={card[i].Region}
                  navig={this.props.navigation}
                />
              );
            })
          ) : (
            <ActivityIndicator size="large" />
          )}
        </ScrollView>
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
  }
});
