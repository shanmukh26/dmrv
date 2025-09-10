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

  // 📅 Application Date & Time
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    Alert.alert("✅ Submitted", "Application details saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Biochar Details Section */}
      <Text style={styles.sectionTitle}>Biochar Details</Text>

      <Text style={styles.label}>Select Biochar Type</Text>
      <Picker
        selectedValue={biocharType}
        onValueChange={setBiocharType}
        style={styles.picker}
      >
        <Picker.Item label="Standard" value="standard" />
        <Picker.Item label="High Quality" value="high" />
        <Picker.Item label="Low Grade" value="low" />
      </Picker>

      <Text style={styles.label}>Unit of Measure</Text>
      <Picker
        selectedValue={unit}
        onValueChange={setUnit}
        style={styles.picker}
      >
        <Picker.Item label="Kg" value="kg" />
        <Picker.Item label="Pound" value="pound" />
        <Picker.Item label="Bag (20kg)" value="bag" />
      </Picker>

      <Text style={styles.label}>Wet Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Wet Amount"
        value={wetAmount}
        onChangeText={setWetAmount}
      />

      <Text style={styles.label}>Moisture Content %</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Moisture Content %"
        value={moisture}
        onChangeText={setMoisture}
      />

      {/* Application Details Section */}
      <Text style={styles.sectionTitle}>Application Details</Text>
      <PhotoCapture
        label="Application Photo"
        onChange={(data) => console.log("Application Photo:", data)}
      />

      {/* Date Selection */}
      <Text style={styles.label}>Application Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>📅 {appliedDate.toLocaleDateString()}</Text>
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

      {/* Time Selection */}
      <Text style={styles.label}>Application Time</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>⏰ {appliedDate.toLocaleTimeString()}</Text>
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

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#25632D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
  },
  label: { fontWeight: "600", marginTop: 10 },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
  },
  submitButton: {
    backgroundColor: "#25632D",
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
