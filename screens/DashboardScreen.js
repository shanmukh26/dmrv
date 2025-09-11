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
      navigation.replace("Login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Dashboard</Text>
      <Text style={styles.screenSubtitle}>Logged in as {userEmail}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Management</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("FarmersScreen")}>
          <Text style={styles.primaryButtonText}>Farmers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Trainings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: "700", color: "#1e5123", marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: "#4b5563", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#e5e7eb", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#25632D", marginBottom: 12 },
  primaryButton: { backgroundColor: "#25632D", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryButton: { backgroundColor: "#0ea5e9", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  secondaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  logoutButton: { backgroundColor: "#d9534f", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginTop: 20 },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
