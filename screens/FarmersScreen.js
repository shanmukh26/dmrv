import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FarmersScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Farmers</Text>
      <Text style={styles.screenSubtitle}>Manage farmers and records.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("AddFarmer")}>
          <Text style={styles.primaryButtonText}>Add Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("FarmersList")}>
          <Text style={styles.secondaryButtonText}>Farmers List</Text>
        </TouchableOpacity>
      </View>
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
});
