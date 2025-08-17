import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import Background from "../components/GradialBackground";
import { Ionicons } from '@expo/vector-icons';
import { Linking } from "react-native";
import { fetchBrandById } from "../services/brandService";
export default function BrandDetailScreen({ navigation, route }) {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { brandId } = route.params;

  useEffect(() => {
    const getBrand = async () => {
      try {
        const data = await fetchBrandById(brandId); // <-- call service
        setBrand(data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getBrand();
  }, [brandId]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return (
      <Background>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View className="flex-1 justify-center items-center pt-12">
          <ActivityIndicator size="large" color="#4a90e2" />
          <Text className="text-white text-lg mt-4">Loading brand details...</Text>
        </View>
      </Background>
    );
  }

  if (!brand) {
    return (
      <Background>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View className="flex-1 justify-center items-center pt-12">
          <Text className="text-white text-lg">Brand not found</Text>
          <TouchableOpacity
            className="bg-blue-600 px-6 py-3 rounded-xl mt-4"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView className="flex-1 pt-12 pb-12" >


        {/* Back Arrow */}
        <TouchableOpacity
          className="absolute top-5 left-5 z-20"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>

        {/* Brand Logo and Name */}
        <View className="items-center mt-10 mb-6 z-20">
          <Image
            source={{ uri: brand.logo }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-white text-3xl font-bold text-center">
            {brand.name}
          </Text>
        </View>

        {/* Follow Button */}
        <View className="items-center mb-6 z-20">
          <TouchableOpacity
            className={`px-6 py-3 rounded-2xl shadow-lg ${isFollowing ? 'bg-gray-600' : 'bg-blue-700'
              }`}
            activeOpacity={0.8}
            onPress={handleFollowToggle}
          >
            <Text className="text-white text-lg font-semibold">
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Brand Details */}
        <View className="px-6 pb-10 z-20">
          {/* Description */}
          {brand.description && (
            <View className="bg-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">About</Text>
              <Text className="text-white/90 text-base leading-6">
                {brand.description}
              </Text>
            </View>
          )}

          {/* Industry */}
          {brand.industry && (
            <View className="bg-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Industry</Text>
              <Text className="text-white/90 text-base">{brand.industry}</Text>
            </View>
          )}

          {/* Founded Year */}
          {brand.founded && (
            <View className="bg-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Founded</Text>
              <Text className="text-white/90 text-base">{brand.founded}</Text>
            </View>
          )}

          {/* Headquarters */}
          {brand.headquarters && (
            <View className="bg-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Headquarters</Text>
              <Text className="text-white/90 text-base">{brand.headquarters}</Text>
            </View>
          )}

          {/* Website */}
          {brand.website && (
            <View className="bg-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Website</Text>
              <Text
                className="text-blue-400 text-base"
                onPress={() => Linking.openURL(brand.website)}
              >
                {brand.website}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Background>
  );
}

