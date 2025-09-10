// screens/MixingScreen.js
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
import { PhotoCapture, DocumentUpload } from "../components/UploadComponents";

export default function MixingScreen() {
  const [mixSite, setMixSite] = useState("");
  const [mixDate, setMixDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [material, setMaterial] = useState("aid wash");

  const handleSubmit = () => {
    Alert.alert("✅ Submitted", "Mixing details saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mix Site */}
      <Text style={styles.sectionTitle}>Mix Site</Text>
      <TextInput
        style={styles.input}
        value={mixSite}
        onChangeText={setMixSite}
        placeholder="Enter Site"
      />

      {/* Mix Date */}
      <Text style={styles.sectionTitle}>Mix Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>📅 {mixDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={mixDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              let updated = new Date(mixDate);
              updated.setFullYear(selectedDate.getFullYear());
              updated.setMonth(selectedDate.getMonth());
              updated.setDate(selectedDate.getDate());
              setMixDate(updated);
            }
          }}
        />
      )}

      {/* Mix Time */}
      <Text style={styles.sectionTitle}>Mix Time</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>⏰ {mixDate.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={mixDate}
          mode="time"
          display="clock"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              let updated = new Date(mixDate);
              updated.setHours(selectedTime.getHours());
              updated.setMinutes(selectedTime.getMinutes());
              setMixDate(updated);
            }
          }}
        />
      )}

      {/* Biochar Details */}
      <Text style={styles.sectionTitle}>Biochar Details</Text>
      <Text style={styles.label}>Mix Materials</Text>
      <Picker
        selectedValue={material}
        onValueChange={setMaterial}
        style={styles.picker}
      >
        <Picker.Item label="Aid Wash" value="aid wash" />
        <Picker.Item label="Animal Bedding" value="animal bedding" />
        <Picker.Item label="Animal Feed" value="animal feed" />
        <Picker.Item label="Compost" value="compost" />
        <Picker.Item label="Construction Materials" value="construction" />
      </Picker>

      <Text style={styles.label}>Wet Biochar Amount</Text>
      <TextInput style={styles.input} placeholder="Enter Wet Biochar Amount" />

      <Text style={styles.label}>Unit of Measure</Text>
      <TextInput style={styles.input} placeholder="Enter Unit (kg, bag...)" />

      <Text style={styles.label}>Moisture Content %</Text>
      <TextInput style={styles.input} placeholder="Enter Moisture %" />

      <PhotoCapture
        label="Moisture Meter Capture"
        onChange={(d) => console.log("Moisture Photo:", d)}
      />

      {/* Final Mix Details */}
      <Text style={styles.sectionTitle}>Final Mix Details</Text>
      <Text style={styles.label}>Final Mix Amount</Text>
      <TextInput style={styles.input} placeholder="Enter Final Mix Amount" />

      <Text style={styles.label}>Unit of Measure</Text>
      <TextInput style={styles.input} placeholder="Enter Unit (kg, bag...)" />

      <PhotoCapture
        label="Post Mix Photo"
        onChange={(d) => console.log("Post Mix Photo:", d)}
      />
      <DocumentUpload
        label="Additional Documentation"
        onChange={(d) => console.log("Doc:", d)}
      />

      {/* Inventory Filters */}
      <Text style={styles.sectionTitle}>Inventory Filters</Text>
      <Text style={styles.label}>Site</Text>
      <TextInput style={styles.input} placeholder="Enter Site" />

      <Text style={styles.label}>Biochar</Text>
      <TextInput style={styles.input} placeholder="Enter Biochar" />

      <Text style={styles.label}>Pyrolysis Equipment</Text>
      <TextInput style={styles.input} placeholder="Enter Equipment" />

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
