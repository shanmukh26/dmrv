import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PhotoCapture, DocumentUpload } from "../components/UploadComponents"; // ✅ Import reusable

// 📅 Format date as DD/MM/YYYY
const formatDate = (date) =>
  date.getDate().toString().padStart(2, "0") +
  "/" +
  (date.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  date.getFullYear();

// ⏰ Format time as HH:mm
const formatTime = (date) =>
  date.getHours().toString().padStart(2, "0") +
  ":" +
  date.getMinutes().toString().padStart(2, "0");

export default function ProductionScreen() {
  const [site, setSite] = useState("");
  const [biochar, setBiochar] = useState("");
  const [equipment, setEquipment] = useState("Kontikki");
  const [batchId, setBatchId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleSubmit = () => {
    Alert.alert("✅ Submitted", "Production data saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Production Details</Text>

      <Text style={styles.label}>Site</Text>
      <TextInput style={styles.input} value={site} onChangeText={setSite} />

      <Text style={styles.label}>Biochar</Text>
      <TextInput style={styles.input} value={biochar} onChangeText={setBiochar} />

      <Text style={styles.label}>Equipment</Text>
      <TextInput style={styles.input} value={equipment} onChangeText={setEquipment} />

      <Text style={styles.label}>CSI Batch ID</Text>
      <TextInput style={styles.input} value={batchId} onChangeText={setBatchId} />

      {/* Start Date */}
      <Text style={styles.label}>Production Start Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
        <Text>📅 {formatDate(startDate)}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              let updated = new Date(startDate);
              updated.setFullYear(selectedDate.getFullYear());
              updated.setMonth(selectedDate.getMonth());
              updated.setDate(selectedDate.getDate());
              setStartDate(updated);
            }
          }}
        />
      )}

      <Text style={styles.label}>Production Start Time</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartTimePicker(true)}>
        <Text>⏰ {formatTime(startDate)}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display="clock"
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(false);
            if (selectedTime) {
              let updated = new Date(startDate);
              updated.setHours(selectedTime.getHours());
              updated.setMinutes(selectedTime.getMinutes());
              setStartDate(updated);
            }
          }}
        />
      )}

      {/* End Date */}
      <Text style={styles.label}>Production End Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
        <Text>📅 {formatDate(endDate)}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              let updated = new Date(endDate);
              updated.setFullYear(selectedDate.getFullYear());
              updated.setMonth(selectedDate.getMonth());
              updated.setDate(selectedDate.getDate());
              setEndDate(updated);
            }
          }}
        />
      )}

      <Text style={styles.label}>Production End Time</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndTimePicker(true)}>
        <Text>⏰ {formatTime(endDate)}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endDate}
          mode="time"
          display="clock"
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(false);
            if (selectedTime) {
              let updated = new Date(endDate);
              updated.setHours(selectedTime.getHours());
              updated.setMinutes(selectedTime.getMinutes());
              setEndDate(updated);
            }
          }}
        />
      )}

      {/* Moisture Section */}
      <Text style={styles.sectionTitle}>Biomass Moisture</Text>
      <Text style={styles.label}>Moisture %</Text>
      <TextInput style={styles.input} placeholder="%" />
      <Text style={styles.label}>Weight</Text>
      <TextInput style={styles.input} placeholder="Weight" />
      <PhotoCapture label="Moisture Reading Photo" onChange={(data) => console.log(data)} />
      <DocumentUpload label="Documentation" onChange={(file) => console.log(file)} />

      {/* Biochar Section */}
      <Text style={styles.sectionTitle}>Biochar</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} placeholder="Amount" />
      <Text style={styles.label}>Unit</Text>
      <TextInput style={styles.input} placeholder="kg, pound, bag" />
      <PhotoCapture label="Biochar Produced Photo" onChange={(data) => console.log(data)} />
      <PhotoCapture label="Kiln Start Photo" onChange={(data) => console.log(data)} />
      <PhotoCapture label="Kiln End Photo" onChange={(data) => console.log(data)} />

      {/* Production Details Section */}
      <Text style={styles.sectionTitle}>Production Details</Text>
      <PhotoCapture label="Temperature Reading Photo" onChange={(data) => console.log(data)} />
      <Text style={styles.label}>Biochar Time in Reactor</Text>
      <TextInput style={styles.input} placeholder="Approx time" />
      <Text style={styles.label}>Biochar Discarded Amount</Text>
      <TextInput style={styles.input} placeholder="Amount" />
      <Text style={styles.label}>Discarded Unit</Text>
      <TextInput style={styles.input} placeholder="Unit" />
      <Text style={styles.label}>Water Used</Text>
      <TextInput style={styles.input} placeholder="Litres" />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#25632D" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f1f1f1",
  },
  submitButton: {
    backgroundColor: "#25632D",
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 16 },
});
