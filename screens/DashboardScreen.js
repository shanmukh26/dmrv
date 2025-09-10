import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function DashboardScreen({ route }) {
  const navigation = useNavigation();
  const userEmail = route.params?.email || "Climapreneur";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ User logged out");
      navigation.replace("Login"); // send user back to login
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Logged in as {userEmail}</Text>
      <TouchableOpacity style={styles.farmerButton} onPress={() => navigation.navigate("FarmersScreen")}>
        <Text style={styles.farmerText}>Farmers Section</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainingButton}>
        <Text style={styles.trainingText}>Trainings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#25632D" },
  subtitle: { fontSize: 14, marginBottom: 40, color: "#555", textAlign: "center" },
logoutButton: { 
  backgroundColor: "#d9534f", 
  paddingVertical: 14, 
  paddingHorizontal: 30, 
  borderRadius: 8,
  marginTop: 30,   // <-- add margin to push it down
},
logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },

farmerButton: {
  backgroundColor: "#25632D",
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 20,
},
farmerText: { color: "#fff", fontSize: 16, fontWeight: "600" },

trainingButton: {
  backgroundColor: "#007bff",
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 20,
},
trainingText: { color: "#fff", fontSize: 16, fontWeight: "600" },


});
