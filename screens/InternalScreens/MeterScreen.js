// screens/MeterScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PhotoCapture } from "../../components/UploadComponents";

export default function MeterScreen() {
  const [biochar, setBiochar] = React.useState("standard");

  const handleSubmit = () => {
    Alert.alert("✅ Submitted", "Meter details saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Meter Measurement</Text>

      <Text style={styles.label}>Select Biochar</Text>
      <Picker selectedValue={biochar} onValueChange={setBiochar} style={styles.picker}>
        <Picker.Item label="Standard" value="standard" />
        <Picker.Item label="High Quality" value="high" />
        <Picker.Item label="Low Grade" value="low" />
      </Picker>

      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i}>
          <Text style={styles.label}>Meter Reading {i} (%)</Text>
          <TextInput style={styles.input} placeholder={`Enter Reading ${i}`} />
          <PhotoCapture label={`Meter Reading ${i} Photo`} onChange={(d) => console.log(`Reading ${i}`, d)} />
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#25632D" },
  label: { fontWeight: "600", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#f9f9f9" },
  picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#f9f9f9", marginBottom: 12 },
  submitButton: { backgroundColor: "#25632D", padding: 15, borderRadius: 8, marginVertical: 20 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 16 },
});
