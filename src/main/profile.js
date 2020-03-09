import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from "react-native-gesture-handler";
import SHeader from "../components/sHeader";
import * as firebase from "firebase";
import configFirebase from "../config/firebaseConfig";
import { Card, CardItem } from "native-base";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      photoURL: null,
      displayName: "",
      email: "",
      uid: null,
      isLoggedIn: null,
      password: "",
      savePassword: "",
      saveEmail: "",
      eChanged: false,
      pChanged: false,
      gender: "",
      backgroundColor1: "",
      backgroundColor: ""
    };
  
  }
  
  componentDidMount() {
    try {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref("users/")
            .child(user.uid)
            .once("value")
            .catch(err => Alert.alert(err.code))
            .then(user => {
              if (!user.val().gender) {
                this.setState({
                  gender: "unknown"
                });
              } else {
                this.setState({
                  gender: user.val().gender
                });
                if (this.state.gender == "Male") {
                  this.setState({
                    backgroundColor: "rgba(246, 195, 229, 0.5)",
                    backgroundColor1: "#fff"
                  });
                } else if (this.state.gender) {
                  this.setState({
                    backgroundColor1: "rgba(246, 195, 229, 0.5)",
                    backgroundColor: "#fff"
                  });
                }
              }
              this.setState({
                displayName: user.val().displayName,
                email: user.val().email,
                saveEmail: user.val().email,
                uid: user.val().uid,
                photoURL: user.val().photoURL,
                isLoggedIn: true,
                password: user.val().password,
                savePassword: user.val().password
              });
            });
        } else {
          this.setState({
            displayName: "Guest",
            email: "guest@guest.com",
            uid: "gussygussy",
            isLoggedIn: false,
            gender: "guest"
          });
        }
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  reauthPass = () => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.savePassword
    );
    return user.reauthenticateWithCredential(credential);
  };

  reauthEmail = () => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.savePassword
    );
    return user.reauthenticateWithCredential(credential);
  };

  chnagePass = (uid, password) => {
    if (password == "") {
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
    } else {
      this.reauthPass().then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.password)
          .catch(errr => console.log(errr))
          .then(() => {
            firebase
              .database()
              .ref("users/" + uid)
              .update({
                password: this.state.password
              })
              .catch(err => {
                console.log(err.code);
              });
            this.setState({
              pChanged: true
            });
          })
          .catch(err => console.log(err.message));
      });

      if (this.state.pChanged) {
        this.signOut()
        ToastAndroid.showWithGravityAndOffset(
          "Please sign In Again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        this.props.navigation.navigate("Auth");
      }
    }
  };

  updateUser = async (image, uid, name, email, gender) => {
    const res = await fetch(image);
    const blob = await res.blob();
    await firebase
      .storage()
      .ref("images/")
      .child(uid)
      .put(blob)
      .catch(err => {
        console.log(err);
      });
    if (name == "") {
      ToastAndroid.showWithGravityAndOffset(
        "name Required",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    await firebase
      .storage()
      .ref("images/")
      .child(uid)
      .getDownloadURL()
      .then(url => {
        return url;
      })
      .catch(err => console.log(err))
      .then(url => {
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            photoURL: url,
            displayName: name,
            gender: gender
          })
          .catch(err => console.log(err));
      });
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email == "") {
      ToastAndroid.showWithGravityAndOffset(
        "Email Invalid",
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
    } else {
      this.reauthEmail().then(() => {
        var user = firebase.auth().currentUser;
        console.log(this.state.email);
        var newEmail = this.state.email;
        user
          .updateEmail(newEmail)
          .catch(errr => console.log(errr))
          .then(() => {
            firebase
              .database()
              .ref("users/" + uid)
              .update({
                email: this.state.email
              })
              .catch(err => {
                console.log(err.code);
              });
            this.setState({
              eChanged: true
            });
          })
          .catch(err => console.log(err.message));
      })

      if (this.state.eChanged) {
        this.signOut();
        ToastAndroid.showWithGravityAndOffset(
          "Please sign In Again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        this.props.navigation.navigate("Auth");
      }
    }
  };

  pickImage = async () => {
    //this.getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photoURL: result.uri });
      console.log(this.state.photoURL);
    } else {
      console.log(this.state.photoURL);
    }
  };

  signOut = () => {
    this.setState({
      photoURL: null,
      displayName: null,
      email: null,
      uid: null,
      isLoggedIn: null
    });
    firebase
      .auth()
      .signOut()
      .catch(err => Alert.alert(err.code))
      .then(response => {
        console.log(response);
        this.props.navigation.navigate("Auth");
      });
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/profile.png")}
        style={{ flex: 1, position: "absolute", height: height, width: width }}
      >
        <SHeader
          title="Edit Profile"
          navig={this.props.navigation}
          dest={"profile"}
          iconName={"md-create"}
        />

        <View style={styles.top}>
          <TouchableOpacity onPress={this.pickImage} style={styles.image}>
            {this.state.isLoggedIn ? (
              <Image
                source={{ uri: this.state.photoURL }}
                style={{ width: 130, height: 130, borderRadius: 75 }}
              />
            ) : (
              <Image
                source={require("../../assets/profile-pic.jpg")}
                style={{ width: 130, height: 130, borderRadius: 75 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={styles.mid} behavior="padding" enabled>
          <View style={styles.textCont}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              defaultValue={this.state.displayName}
              onChangeText={displayName => {
                this.setState({ displayName });
              }}
            ></TextInput>
          </View>

          <View style={styles.textCont}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              defaultValue={this.state.email}
              onChangeText={email => {
                this.setState({ email });
              }}
            ></TextInput>
          </View>

          <View style={styles.textCont}>
            <Text style={styles.text}>Sex</Text>
            <View style={{flexDirection:'row',marginLeft:25}}>
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
        </KeyboardAvoidingView>

        <KeyboardAvoidingView style={styles.bottom}>
          <View style={{ marginBottom: 30 ,width:width/1.2}}>
            <Button
              title=" Update Profile "
              color="#df42d1"
              onPress={() =>
                this.updateUser(
                  this.state.photoURL,
                  this.state.uid,
                  this.state.displayName,
                  this.state.email,
                  this.state.gender
                )
              }
            />
          </View>
          <View style={styles.textCont}>
            <Text style={styles.text}>Pass</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              defaultValue={this.state.password}
              onChangeText={password => {
                this.setState({ password });
              }}
            ></TextInput>
          </View>
          <View style={{ marginTop: 20,width:width/2 }}>
            <Button
              title=" Change Password "
              color="#df42d1"
              onPress={() =>
                this.chnagePass(this.state.uid, this.state.password)
              }
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  top: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  mid: {
    flex: 0.7,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 10,
    marginHorizontal: 20
  },
  bottom: {
    flex: 1,
    margin: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 142,
    width: 142,
    borderRadius: 75,
    backgroundColor: "rgba(246, 195, 229, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  textCont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    flex: 0.40,
    fontSize: 20,
    fontWeight: "900"
  },
  textInput: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#f7beff",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10
  }
});
