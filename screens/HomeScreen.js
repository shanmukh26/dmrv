import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function HomeScreen() {
  const navigation = useNavigation();
  const userEmail = auth.currentUser?.email || "Climapreneur";

  // 📷 Camera permission
  const requestCamera = async () => {
    let { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Camera access required", "Enable camera to take photos.");
      return false;
    }
    return true;
  };

  // 🖼 Media library permission
  const requestMedia = async () => {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Media access required", "Enable media access to upload files.");
      return false;
    }
    return true;
  };

  // 📍 Location permission
  const requestLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Location required", "Enable location for this feature.");
      return false;
    }
    return true;
  };

  // 👇 Example: Biomass Delivery needs media access
  const handleBiomassDelivery = async () => {
    const ok = await requestMedia();
    if (!ok) return; // stop if denied
    navigation.navigate("BiomassDelivery");
  };

  const buttons = [
    { label: "Biomass Delivery", action: handleBiomassDelivery },
    { label: "Production", route: "Production" },
    { label: "Biochar End Use", route: "BiocharEndUse" },
    { label: "Moisture Content", route: "MoistureContent" },
    { label: "Receipt", route: "Receipt" },
    { label: "Dashboard", route: "Dashboard" },
  ];

  return (
    <View style={styles.container}>
      {/* Welcome Header */}
      <Text style={styles.welcome}>Hi, Welcome</Text>
      <Text style={styles.email}>{userEmail}</Text>

      {/* Grid of Buttons */}
      <View style={styles.grid}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              btn.action
                ? btn.action() // runs custom permission-aware handler
                : navigation.navigate(btn.route) // just navigate
            }
          >
            <Text style={styles.cardText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  welcome: { fontSize: 22, fontWeight: "600", marginBottom: 4, color: "#25632D", marginTop: 40 },
  email: { fontSize: 16, marginBottom: 20, color: "#333" },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
  },
  card: {
    width: "48%",
    height: 100,
    backgroundColor: "#25632D",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
