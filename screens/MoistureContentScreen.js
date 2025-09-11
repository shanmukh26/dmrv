// screens/MoistureContentScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MoistureContentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Moisture Content</Text>
      <Text style={styles.screenSubtitle}>Choose a measurement method.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Methods</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DryOven")}>
          <Text style={styles.buttonText}>Dry Oven</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BulkDensity")}>
          <Text style={styles.buttonText}>Bulk Density</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Meter")}>
          <Text style={styles.buttonText}>Meter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: "700", color: "#1e5123", marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: "#4b5563", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e5e7eb", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#25632D", marginBottom: 12 },
  button: { backgroundColor: "#25632D", paddingVertical: 14, borderRadius: 10, marginVertical: 6, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
