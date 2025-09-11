// screens/ApplicationScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { PhotoCapture } from "../components/UploadComponents";

export default function ApplicationScreen() {
  const [biocharType, setBiocharType] = useState("standard");
  const [unit, setUnit] = useState("kg");
  const [wetAmount, setWetAmount] = useState("");
  const [moisture, setMoisture] = useState("");

  const [appliedDate, setAppliedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    const missing = [];
    if (!biocharType) missing.push("Biochar Type");
    if (!unit) missing.push("Unit");
    if (!wetAmount) missing.push("Wet Amount");
    if (!moisture) missing.push("Moisture %");
    if (!appliedDate) missing.push("Application Date/Time");
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
    Alert.alert("✅ Submitted", "Application details saved successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Application</Text>
      <Text style={styles.screenSubtitle}>Record application details below.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Biochar Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Select Biochar Type <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={biocharType} onValueChange={setBiocharType} style={styles.picker}>
              <Picker.Item label="Select Type" value="" color="#9ca3af" />
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="High Quality" value="high" />
              <Picker.Item label="Low Grade" value="low" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit of Measure <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={unit} onValueChange={setUnit} style={styles.picker}>
              <Picker.Item label="Select Unit" value="" color="#9ca3af" />
              <Picker.Item label="Kg" value="kg" />
              <Picker.Item label="Pound" value="pound" />
              <Picker.Item label="Bag (20kg)" value="bag" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Wet Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Wet Amount" value={wetAmount} onChangeText={setWetAmount} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Moisture Content % <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Moisture Content %" value={moisture} onChangeText={setMoisture} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Application Details</Text>
        <PhotoCapture label="Application Photo" onChange={(data) => console.log("Application Photo:", data)} />
        <View style={styles.field}>
          <Text style={styles.label}>Application Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>📅 {appliedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={appliedDate}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  let updated = new Date(appliedDate);
                  updated.setFullYear(selectedDate.getFullYear());
                  updated.setMonth(selectedDate.getMonth());
                  updated.setDate(selectedDate.getDate());
                  setAppliedDate(updated);
                }
              }}
            />
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Application Time <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateText}>⏰ {appliedDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={appliedDate}
              mode="time"
              display="clock"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  let updated = new Date(appliedDate);
                  updated.setHours(selectedTime.getHours());
                  updated.setMinutes(selectedTime.getMinutes());
                  setAppliedDate(updated);
                }
              }}
            />
          )}
        </View>
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
  field: { marginBottom: 12 },
  required: { color: "#dc2626" },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12, backgroundColor: "#f9fafb" },
  pickerWrapper: { padding: 0 },
  picker: { height: 58, width: "100%", color: "#111827" },
  dateButton: { paddingVertical: 14, justifyContent: "center" },
  dateText: { fontSize: 16, color: "#111827" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
