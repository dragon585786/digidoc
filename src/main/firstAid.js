import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Header from "../components/header";
import { Asset } from "expo-asset";
import CustomDeck from "../components/deck";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class FirstAid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      diseases: null
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/main.png")]),
      // Font.loadAsync({
      //   ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //   ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //   ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //   ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //   ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      // })
    ]);
    this.setState({ isReady: true });
    await firebase
      .database()
      .ref("firstAid/")
      .once("value")
      .catch(err => Alert.alert(err))
      .then(res => {
        this.setState({ diseases: res.val() });
      });
  }

  render() {
    const { diseases } = this.state;

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <ImageBackground
        source={require("../../assets/main.png")}
        style={styles.container}
      >
        <Header
          title={"First Aid"}
          navig={this.props.navigation}
          dest={"FirstAid"}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.diseases != null ? (
            diseases.map((dis, i) => {
              console.log(diseases[i].symptom3)
              return (
                <CustomDeck
                  key={i}
                  nav={this.props.navigation}
                  title={diseases[i].name}
                  des={diseases[i].description}
                  imgURL={diseases[i].imgURL}
                  cure={diseases[i].cure}
                  symptom={diseases[i].symptom}
                  symptom1={diseases[i].symptom1}
                  symptom2={diseases[i].symptom2}
                  symptom3={diseases[i].symptom3}
                  pre={diseases[i].pre}
                  pre1={diseases[i].pre1}
                  pre2={diseases[i].pre2}
                  pre3={diseases[i].pre3}
                  link={diseases[i].link}
                />
              );
            })
          ) : (
            <ActivityIndicator />
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
    alignItems: "center",
  }
});
