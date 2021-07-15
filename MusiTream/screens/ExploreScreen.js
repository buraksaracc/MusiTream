import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ColorArray,
  GradientValues,
  GradientStyle,
} from "../otherComponents/SharedDesign";

export function Explore() {
  return (
    <LinearGradient
      colors={ColorArray}
      start={GradientValues}
      style={GradientStyle}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Explore!</Text>
      </View>
    </LinearGradient>
  );
}
