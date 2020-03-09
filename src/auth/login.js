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
  Grid,
  Form
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Keyboard
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      fontLoaded: false,
      checked: true,
      start: false,
      Authenticating: false,
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    this.setState({ start: false });
    await Promise.all([
      Asset.loadAsync([require("../../assets/bg.jpg")]),
      Font.loadAsync({
        ProximaBold: require("../../assets/fonts/Proxima-Nova-Bold.otf"),
        ProximaBlack: require("../../assets/fonts/Proxima-Nova-Black.otf"),
        ProximaExtraBold: require("../../assets/fonts/Proxima-Nova-Extrabold.otf"),
        ProximaReg: require("../../assets/fonts/Proxima-Nova-Regular.otf"),
        ProximaThin: require("../../assets/fonts/Proxima-Nova-Thin.otf")
      })
    ])
    (this.setState({ fontLoaded: true, isReady: true }));
  }

  componentWillUnmount() {}

  hacked = () => {
    this.props.navigation.navigate("App");
  };

  navigateToDash = (email, password) => {
    Keyboard.dismiss
    try {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (email === "") {
        ToastAndroid.showWithGravityAndOffset(
          "Email Required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (reg.test(email) === false) {
        ToastAndroid.showWithGravityAndOffset(
          "Invalid Email",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        // console.log(this.state.email)
      } else if (password === "") {
        ToastAndroid.showWithGravityAndOffset(
          "Password Required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (password < 6) {
        ToastAndroid.showWithGravityAndOffset(
          "Password must be 6 characters",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (!this.state.checked) {
        ToastAndroid.showWithGravityAndOffset(
          "Please select Agree to our Conditions before proceeding",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        this.setState({ start: true });
        firebase
          .auth()
          .fetchSignInMethodsForEmail(email)
          .catch(err => {
            Alert.alert(err.code);
            this.setState({ start: false });
          })
          .then(response => {
            if (response[0] == "password") {
              return true;
            } else {
              Alert.alert("Please Sign Up !");
              this.props.navigation.replace("Reg");
              return false;
            }
          })

          .then(response => {
            if (response) {
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(err => {
                  Alert.alert(err.message);
                  this.setState({
                    start: false
                  });
                })
                .then(respons => {
                  if (respons == null) {
                    //Firebase returns null if password is incorrect.
                    ToastAndroid.showWithGravityAndOffset(
                      "Please Try Again",
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                      25,
                      50
                    );
                  } else {
                    this.props.navigation.replace("App");
                  }
                });
            }
          });
      }
    } catch (err) {
      Alert.alert(err.message);
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
    this.props.navigation.navigate("Reg");
  };

  render() {
    const { checked, email, password, start } = this.state;
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.img}
      >
        <View style={styles.Cont}>
          <Text style={styles.text}>LOG IN</Text>
          <View style={styles.base}>
            <Item floatingLabel style={styles.item}>
              <Label>E-mail id</Label>
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

            <Grid
              style={{
                marginTop: 39,
                justifyContent: "center",
                marginLeft: 5,
                marginRigh: 5
              }}
            >
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
                onPress={() => this.navigateToDash(email, password)}
                accessible={false}
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
                  Sign In
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
                Don't have an Account? Sign Up.
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
    height: height / 2.2,
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
    marginVertical: 35
  }
});
