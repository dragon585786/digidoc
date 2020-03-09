import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import SHeader from "../components/sHeader";
import { Asset } from "expo-asset";
import { ScrollView } from "react-native-gesture-handler";
import ProfileCard from "../components/profileCard";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class AddDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      name: "",
      gender: "",
      age: "",
      mediBg: "",
      moNo: "",
      bloodGroup: "",
      Region: "Mahrashtra",
      backgroundColor1: "",
      backgroundColor: "",
      vis: false
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/bg.jpg")])
      //   Font.loadAsync({
      //     ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
      //     ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
      //     ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
      //     ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
      //     ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      //   })
    ]).then(this.setState({ isReady: true }));
  }

  mainFun = async (name, age, mediBg, gender, moNo, Region, bloodGroup) => {
  
    if (true) {
      this.setState({ vis: true });
      var newPostKey = firebase
        .database()
        .ref()
        .child("donors")
        .push().key;
      await firebase
        .database()
        .ref("Donors/"+newPostKey)
        .set({
          name: name,
          age: age,
          gender: gender,
          bloodGroup: bloodGroup,
          mediBg: mediBg,
          moNo: moNo,
          Region: Region,
          dir: newPostKey
        })
        .catch(err => Alert.alert(err.message));

      this.setState({
        vis: false,
        name: "",
        gender: "",
        age: "",
        mediBg: "",
        moNo: "",
        bloodGroup: "",
        Region: "Mahrashtra",
        backgroundColor1: "",
        backgroundColor: ""
      });
      this.props.navigation.navigate("donor")
    } else {
      return;
    }
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    var radio_props = [
      { label: "A+    ", value: "A+" },
      { label: "A-    ", value: "A-" },
      { label: "B-    ", value: "B-" },
      { label: "B+    ", value: "B+" }
    ];

    var radio_props1 = [
      { label: "O+    ", value: "O+" },
      { label: "O-    ", value: "O-" },
      { label: "AB-   ", value: "AB-" },
      { label: "AB+   ", value: "AB+" }
    ];

    const { name, age, mediBg, gender, moNo, Region, bloodGroup } = this.state;

    return (
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.container}
      >
        <SHeader
          title="Add New Donor"
          navig={this.props.navigation}
          dest={"donor"}
        />

        <View style={styles.v1}>
          <Ionicons name="md-person" size={105} color={"white"} />
        </View>

        <View behvaiour="position" style={styles.v2}>
          <ScrollView style={{ marginTop: 15 }}>
            <KeyboardAvoidingView behvaiour="padding">
              <View style={styles.textCont}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={name => {
                    this.setState({ name });
                  }}
                ></TextInput>
              </View>

              <View style={styles.textCont}>
                <Text style={styles.text}>Sex</Text>
                <View style={{ flexDirection: "row", marginLeft: 25 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        backgroundColor: "rgba(246, 195, 229, 0.5)",
                        backgroundColor1: "#fff",
                        gender: "Male"
                      });
                    }}
                    style={{
                      marginHorizontal: 10,

                      backgroundColor: this.state.backgroundColor,
                      padding: 6,
                      borderRadius: 9
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17
                      }}
                    >
                      MALE
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        backgroundColor1: "rgba(246, 195, 229, 0.5)",
                        backgroundColor: "#fff",
                        gender: "Female"
                      });
                    }}
                    style={{
                      marginHorizontal: 10,
                      backgroundColor: this.state.backgroundColor1,
                      padding: 6,
                      borderRadius: 9
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17
                      }}
                    >
                      FEMALE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text}>Blood</Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={-1}
                  formHorizontal={true}
                  onPress={label => {
                    this.setState({ bloodGroup: label });
                  }}
                />
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text}></Text>
                <RadioForm
                  radio_props={radio_props1}
                  initial={-1}
                  formHorizontal={true}
                  onPress={label => {
                    this.setState({ bloodGroup: label });
                  }}
                />
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text}>Age</Text>
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={age => {
                    if (age.length > 2) {
                      Alert.alert("Not Eligible");
                    } else {
                      this.setState({ age });
                    }
                  }}
                ></TextInput>
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text1}>Medical Record</Text>
                <TextInput
                  style={styles.textInput1}
                  autoCapitalize="none"
                  onChangeText={mediBg => {
                    this.setState({ mediBg });
                  }}
                ></TextInput>
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text1}>Region</Text>
                <TextInput
                  style={styles.textInput1}
                  autoCapitalize="none"
                  onChangeText={Region => {
                    this.setState({ Region });
                  }}
                ></TextInput>
              </View>
              <View style={styles.textCont}>
                <Text style={styles.text1}>No.</Text>
                <TextInput
                  style={styles.textInput1}
                  autoCapitalize="none"
                  onChangeText={moNo => {
                    this.setState({ moNo });
                  }}
                ></TextInput>
              </View>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.link}
                  onPress={() =>
                    this.mainFun(
                      name,
                      age,
                      mediBg,
                      gender,
                      moNo,
                      Region,
                      bloodGroup
                    )
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "ProximaBold",
                      fontSize: 20,
                      color: "white"
                    }}
                  >
                    {" "}
                    Submit{" "}
                  </Text>
                </TouchableOpacity>
              </View>



              <View style={{ alignItems: "center", marginTop: 20 }}>
                
                  <ActivityIndicator size="large" animating={this.state.vis} />
            
              </View>
            </KeyboardAvoidingView>
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
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
    //   backgroundColor:'red'
  },
  v2: {
    flex: 0.856,
    width: width - 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    borderRadius: 10
  },
  textCont: {
    width: width - 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  text: {
    width: "17%",
    fontSize: 20,
    fontWeight: "900"
  },
  textInput: {
    width: "70%",
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#f7beff",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10
  },
  text1: {
    width: "22%",
    fontSize: 20,
    fontWeight: "900"
  },
  textInput1: {
    width: "70%",
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#f7beff",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10
  },
  link: {
    backgroundColor: "#efb1ff",
    padding: 4,
    width: width - 260,
    borderRadius: 10,
    elevation: 2,
    margin: 20
  }
});
