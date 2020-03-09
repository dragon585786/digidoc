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
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class CustomDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  render() {
    var name = this.props.title;
    var des = this.props.des;
    var imgURL = this.props.imgURL;
    var cure = this.props.cure;
    var symptom = this.props.symptom;
    var symptom1 = this.props.symptom1;
    var symptom2 = this.props.symptom2;
    var symptom3 = this.props.symptom3;
    var pre = this.props.pre;
    var pre1 = this.props.pre1;
    var pre2 = this.props.pre2;
    var pre3 = this.props.pre3;
    var link = this.props.link;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.nav.navigate("Aids", {
            name: name,
            des: des,
            imgURL: imgURL,
            cure: cure,
            symptom: symptom,
            symptom1: symptom1,
            symptom2: symptom2,
            symptom3: symptom3,
            pre:pre,
            pre1:pre1,
            pre2:pre2,
            pre3:pre3,
            link:link,
          })
        }
      >
        <ImageBackground
          style={styles.image}
          imageStyle={{ borderRadius: 20 }}
          source={{
            uri: this.props.imgURL
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(0,0,0,0.7)"]}
              style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: "center"
              }}
            >
              <Text style={styles.text}>{this.props.title}</Text>
            </LinearGradient>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height / 1.4,
    width: width - 30,
    borderRadius: 20,
    margin: 20,
    flex: 1,
  },
  text: {
    marginLeft: 15,
    fontFamily: "ProximaBold",
    color: "#fff",
    fontSize: 55
  },
  image: {
    flex: 1,
    height: height / 1.4,
    width: width - 30,
    position: "absolute",
  }
});
