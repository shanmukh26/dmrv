import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AddFarmerScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");

  const handleSave = () => {
    if (!name || !address || !crop || !area) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    console.log({ name, address, crop, area });
    Alert.alert("Success", "Farmer added successfully (mock)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Add Farmer</Text>
        <Text style={styles.screenSubtitle}>Enter farmer details below. <Text style={styles.required}>*</Text> indicates required.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Farmer Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Farmer Name <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter full name" value={name} onChangeText={setName} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Address <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter address" value={address} onChangeText={setAddress} />
        </View>
        <View style={styles.fieldRow}>
          <View style={[styles.field, styles.fieldHalf]}>
            <Text style={styles.label}>Primary Crop <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} placeholder="e.g. Paddy" value={crop} onChangeText={setCrop} />
          </View>
          <View style={[styles.field, styles.fieldHalf]}>
            <Text style={styles.label}>Area (acres) <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} placeholder="e.g. 2.5" value={area} onChangeText={setArea} keyboardType="numeric" />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitText}>Save Farmer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 20 },
  header: { marginBottom: 12 },
  screenTitle: { fontSize: 22, fontWeight: "700", color: "#1e5123", marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: "#4b5563" },
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
  label: { fontSize: 16, fontWeight: "600", marginBottom: 6, color: "#374151" },
  required: { color: "#dc2626" },
  field: { marginBottom: 12 },
  fieldRow: { flexDirection: "row", gap: 12 },
  fieldHalf: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
