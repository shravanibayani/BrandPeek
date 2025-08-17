import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import Background from "../components/GradialBackground";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-4xl font-bold">BrandPeek</Text>
      </View>
    </Background>
  );
}
