import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class DonorTab extends Component {


  mainDono = () => {
    this.props.navig.navigate('MainDono',{
      name:this.props.name,
      age :this.props.age,
      gender:this.props.gender,
      region:this.props.region,
      bloodGroup:this.props.bloodGroup,
      number : this.props.number,
      mediBg:this.props.mediBg,
    })
  }

  render() {

    
    return (
      <TouchableOpacity style={styles.container} onPress={()=>this.mainDono()} >
       
          <View style={styles.img}>
              <Ionicons name="ios-person" size={100} color='white'/>
          </View>
          <View style={styles.data}>
              <Text style={styles.text}>{this.props.name}</Text>
              <Text style={styles.text}>{this.props.number}</Text>
              <Text style={styles.text}>{this.props.bloodGroup}</Text>
          </View>
       
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical:7,
    height: height / 6,
    width: width - 20,
    backgroundColor: "rgba(239,160,217,0.9)",
    borderRadius: 5,
    flexDirection:'row',
    elevation:2,
  },
  img: {
    flex: 0.4,
    justifyContent:'center',
    alignItems:'center',
  },
  data: {
    flex: 1,
    justifyContent:'center',
    alignItems:'flex-start',
    //backgroundColor:'blue'
  },
  text :{
      fontFamily:'ProximaReg',
      fontSize:21,
      color:'white',
  }
});
