import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import Background from "../components/GradialBackground";
import { fetchBrands } from "../services/allBrandsService";

export default function HomeScreen({ navigation }) {
  const [brands, setBrands] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; 

  useEffect(() => {
    const getBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    getBrands();
  }, []);

  const renderBrand = ({ item, index }) => (
    <TouchableOpacity
      style={{ width: cardWidth }}
      className="bg-white/10 rounded-2xl p-4 mb-4 mx-2"
      onPress={() => navigation.navigate("BrandDetail", { brandId: item.id })}
      activeOpacity={0.7}
    >
      {/* Logo */}
      <View className="items-center mb-3">
        <Image
          source={{ uri: item.logo }}
          className="w-16 h-16 rounded-full"
        />
      </View>

      {/* Brand name */}
      <Text className="text-white text-center text-lg font-semibold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View className="flex-1 pt-12">
        {/* Heading */}
        <Text className="text-white text-2xl font-bold text-center my-4">
          Top Brands Today
        </Text>

        {/* Brand Grid */}
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id}
          renderItem={renderBrand}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20, paddingTop: 10 }}
        />
      </View>
    </Background>
  );
}
