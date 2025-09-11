// screens/MeterScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PhotoCapture } from "../../components/UploadComponents";

export default function MeterScreen() {
  const [biochar, setBiochar] = React.useState("");
  const [readings, setReadings] = React.useState({});

  const handleSubmit = () => {
    const missing = [];
    if (!biochar) missing.push("Biochar");
    for (let i = 1; i <= 5; i++) {
      if (!readings[i]) missing.push(`Reading ${i}`);
    }
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
    Alert.alert("✅ Submitted", "Meter details saved successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Meter</Text>
      <Text style={styles.screenSubtitle}>Capture multiple moisture readings.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Measurement</Text>
        <Text style={styles.label}>Select Biochar <Text style={styles.required}>*</Text></Text>
        <View style={[styles.input, styles.pickerWrapper]}>
          <Picker selectedValue={biochar} onValueChange={setBiochar} style={styles.picker}>
            <Picker.Item label="Select Biochar" value="" color="#9ca3af" />
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="High Quality" value="high" />
            <Picker.Item label="Low Grade" value="low" />
          </Picker>
        </View>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i}>
            <Text style={styles.label}>Meter Reading {i} (%) <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} placeholder={`Enter Reading ${i}`} keyboardType="numeric" value={readings[i] || ""} onChangeText={(v) => setReadings((r) => ({ ...r, [i]: v }))} />
            <PhotoCapture label={`Meter Reading ${i} Photo`} onChange={(d) => console.log(`Reading ${i}`, d)} />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 0 },
  contentContainer: { padding: 20, paddingBottom: 40 },
  screenTitle: { fontSize: 22, fontWeight: "700", color: "#1e5123", marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: "#4b5563", marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e5e7eb", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#25632D", marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 6, color: "#374151" },
  required: { color: "#dc2626" },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12, backgroundColor: "#f9fafb", marginBottom: 12 },
  pickerWrapper: { padding: 0 },
  picker: { height: 58, width: "100%", color: "#111827" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
