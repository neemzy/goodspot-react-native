import React from "react"; // eslint-disable-line no-unused-vars
import { StackNavigator } from "react-navigation";
import AdScreen from "./components/AdScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import NewScreen from "./components/NewScreen";
import MyAdsScreen from "./components/MyAdsScreen";
import EditScreen from "./components/EditScreen";

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Ad: { screen: AdScreen },
  Login: { screen: LoginScreen },
  New: { screen: NewScreen },
  MyAds: { screen: MyAdsScreen },
  Edit: { screen: EditScreen }
});

export default App;
