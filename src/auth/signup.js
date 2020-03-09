import React from "react";
import {
  Button,
  Item,
  Input,
  Label,
  Content,
  Container,
  CheckBox,
  Body,
  Grid
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      fontLoaded: false,
      checked: true,
      start: false,
      username: "",
      email: "",
      password: "",
      passConfirm: ""
    };
  }

  async componentDidMount() {
    await Promise.all([
      Asset.loadAsync([require("../../assets/bg.jpg")]),
      Font.loadAsync({
        ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
        ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
        ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
        ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
        ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      })
    ]).then( this.setState({ fontLoaded: true, isReady: true }))
  }

  navigateToDash = (email, password, username, passConfirm) => {
    Keyboard.dismiss
    try {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (username == "") {
        ToastAndroid.showWithGravityAndOffset(
          "Name Required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (email == "") {
        ToastAndroid.showWithGravityAndOffset(
          "Email Required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (reg.test(email) == false) {
        ToastAndroid.showWithGravityAndOffset(
          "Invalid Email",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (password == "") {
        ToastAndroid.showWithGravityAndOffset(
          "Password Required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (password.length < 6) {
        ToastAndroid.showWithGravityAndOffset(
          "Password must be 6 characters",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (password != passConfirm) {
        ToastAndroid.showWithGravityAndOffset(
          "Passwords don't match",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (!this.state.checked){
        ToastAndroid.showWithGravityAndOffset(
          "Please select Agree to our Conditions before proceeding",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50);
      }else {
        this.setState({
          start:true,
        })
        firebase
          .auth()
          .fetchSignInMethodsForEmail(email)
          .catch(err => {
            Alert.alert(err.code);
            this.setState({
              start:false,
            })
          })
          .then(response => {
            if (response[0] == "password") {
              Alert.alert("Email Already Exists");
              this.setState({
                start:false,
              })
              return false;
            } else {
              return true;
            }
          })
          .then(response => {
            if (response) {
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(err => {
                  console.log(err.code)
                  this.setState({
                    start:false,
                  })
                })
                .then(response => {
                  firebase
                    .database()
                    .ref("users/" + response.user.uid)
                    .set({
                      displayName: username,
                      email: response.user.email,
                      password: password,
                      photoURL: "unknown",
                      uid: response.user.uid
                    })
                    .catch(error => {
                      console.log(error);
                      this.setState({
                        start:false,
                      })
                    });
                });
              ToastAndroid.showWithGravityAndOffset(
                "Sign Up Sucessfull !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.props.navigation.replace("App");
            }
          })
          .catch(err => {
            Alert.alert(err);
          });
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  checkbox = () => {
    if (!this.state.checked) {
      this.setState({
        checked: true
      });
    } else {
      this.setState({
        checked: false
      });
    }
  };

  signUp = () => {
    this.props.navigation.replace("Auth");
  };

  render() {
    const {
      checked,
      start,
      email,
      passConfirm,
      password,
      username
    } = this.state;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.img}
      >
        <View style={styles.Cont}>
          <Text style={styles.text}>REGISTER</Text>
          <View style={styles.base}>
            <Item floatingLabel style={styles.item}>
              <Label>Name</Label>
              <Input
                onChangeText={username => {
                  this.setState({ username });
                }}
                placeholder="Name"
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Email-id</Label>
              <Input
                autoCapitalize="none"
                onChangeText={email => {
                  this.setState({ email });
                }}
                placeholder="Email-Id"
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Password</Label>
              <Input
                autoCapitalize="none"
                onChangeText={password => {
                  this.setState({ password });
                }}
                secureTextEntry={true}
                placeholder="Password"
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Confirm Password</Label>
              <Input
                autoCapitalize="none"
                onChangeText={passConfirm => {
                  this.setState({ passConfirm });
                }}
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
            </Item>

            <Grid style={{ marginTop: 39, justifyContent: "center",marginLeft:5,marginRight:5 }}>
              <CheckBox
                color="#f7beff"
                checked={checked}
                onPress={() => this.checkbox()}
              />
               <TouchableOpacity  checked={checked}
                onPress={() => this.checkbox()}>
                <Text style={styles.checkText}>
                  Agree to our Terms & Conditions.
                </Text>
              </TouchableOpacity>
            </Grid>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 30
              }}
            >
              <Button
                onPress={() =>
                  this.navigateToDash(
                    email,
                    password,
                    username,
                    passConfirm
                  )
                }
                style={{ backgroundColor: "#f7beff" }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    paddingHorizontal: 7,
                    fontFamily: "ProximaBold"
                  }}
                >
                  Sign Up
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.bottom}>
            <Button transparent onPress={() => this.signUp()}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "ProximaBold"
                }}
              >
                Already have an Account? Sign in.
              </Text>
            </Button>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#f7beff" animating={start} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    //flex: 1,
    height: height,
    width: width,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  Cont: {
    width: width - 40
  },
  base: {
    backgroundColor: "#fff",
    height: height / 1.5,
    width: width - 40,
    borderRadius: 15
  },
  text: {
    fontFamily: "ProximaExtraBold",
    color: "#fff",
    fontSize: 48,
    paddingBottom: 10
  },
  item: {
    marginTop: 22,
    marginLeft: 20,
    marginRight: 20
  },
  checkText: {
    fontFamily: "ProximaReg",
    fontSize: 18,
    paddingLeft: 19
  },
  bottom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  }
});
