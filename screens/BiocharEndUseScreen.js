// screens/EndUseScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BiocharEndUseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>End Use</Text>
      <Text style={styles.screenSubtitle}>Choose an action to continue.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Mixing")}>
          <Text style={styles.buttonText}>Mixing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Application")}>
          <Text style={styles.buttonText}>Application</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Invoicing")}>
          <Text style={styles.buttonText}>Biochar Invoicing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: "700", color: "#1e5123", marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: "#4b5563", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#25632D", marginBottom: 12 },
  button: { backgroundColor: "#25632D", paddingVertical: 14, borderRadius: 10, marginVertical: 6, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
