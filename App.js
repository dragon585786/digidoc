import React from "react";
import Login from "./src/auth/login";
import SignUp from "./src/auth/signup";
import Dash from "./src/main/dash";
import FirstAid from "./src/main/firstAid";
import Profile from "./src/main/mainProfile";
import EditProfile from './src/main/profile';
import Notify from "./src/screens/notification";
import Aid from './src/screens/aid';
import Donor from './src/main/donor'
import Maap from './src/main/map'
import Post from './src/screens/post'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { zoomIn, fadeIn, fadeOut, zoomOut } from "react-navigation-transitions";
import { Ionicons } from "@expo/vector-icons";
import SideBar from "./src/components/SideBar";
import { Dimensions } from "react-native";
import MainDonor from './src/screens/mainDonor'
import AddDonor from "./src/screens/addDonor";
import Mumbai from "./src/screens/mumHosp";
import BloodBank from './src/main/bloodbank';
import AboutUs from "./src/main/aboutus";
import Contact from "./src/main/contact";

const AppStack = createDrawerNavigator(
  {
    dashboard: {
      screen: Dash,
      navigationOptions: {
        title: "Explore",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={24} color={tintColor} />
        )
      }
    },
    FirstAid: {
      screen: FirstAid,
      navigationOptions: {
        title: "First Aid",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-medkit" size={24} color={tintColor} />
        )
      }
    },
    donor: {
      screen: Donor,
      navigationOptions: {
        title: "Donors",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-water" size={24} color={tintColor} />
        )
      }
    },
    map: {
      screen: Maap,
      navigationOptions: {
        title: "Hospitals",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-compass" size={24} color={tintColor} />
        )
      }
    },
    blood: {
      screen: BloodBank,
      navigationOptions: {
        title: "BloodBank",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-navigate" size={24} color={tintColor} />
        )
      }
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        title: "My Profile",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-person" size={24} color={tintColor} />
        )
      }
    },
    about: {
      screen: AboutUs,
      navigationOptions: {
        title: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-people" size={24} color={tintColor} />
        )
      }
    },
    contact: {
      screen: Contact,
      navigationOptions: {
        title: "Contact",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-call" size={24} color={tintColor} />
        )
      }
    },
    
    
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: false,
    contentOptions: {
      activeBackgroundColor: "rgba(212,118,207, 0.2)",
      activeTintColor: "#53115B",
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8
      },
      itemStyle: {
        borderRadius: 4
      }
    }
  }
);

export default createAppContainer(
  createStackNavigator(
    {
      Auth: Login,
      Reg: SignUp,
      Aids:Aid,
      App: AppStack,
      Noti: Notify,
      EditProf:EditProfile,
      Posts:Post,
      MainDono:MainDonor,
      AddDono:AddDonor,
      Mum:Mumbai,
    },
    {
      initialRouteName: "Auth",
      transitionConfig: () => zoomIn(500),
      headerMode: "none",
      headerShown: false
    }
  )
);

//using promise for activity indicator
