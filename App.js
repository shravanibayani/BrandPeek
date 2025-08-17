import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import Background from "./components/GradialBackground";
import { enableScreens } from "react-native-screens";
import "./global.css"
export default function App() {
  enableScreens();
  return (
    <Background>
      <StackNavigator />
    </Background>
  );
}
