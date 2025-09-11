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
  // Additional required fields
  const [moisturePercent, setMoisturePercent] = useState("");
  const [moistureWeight, setMoistureWeight] = useState("");
  const [biocharAmount, setBiocharAmount] = useState("");
  const [biocharUnit, setBiocharUnit] = useState("");
  const [reactorTime, setReactorTime] = useState("");
  const [waterUsed, setWaterUsed] = useState("");
  const [discardedAmount, setDiscardedAmount] = useState("");
  const [discardedUnit, setDiscardedUnit] = useState("");

  const handleSubmit = () => {
    const missing = [];
    if (!site) missing.push("Site");
    if (!biochar) missing.push("Biochar");
    if (!equipment) missing.push("Equipment");
    if (!batchId) missing.push("CSI Batch ID");
    if (!startDate) missing.push("Start Date");
    if (!endDate) missing.push("End Date");
    if (!moisturePercent) missing.push("Moisture %");
    if (!moistureWeight) missing.push("Moisture Weight");
    if (!biocharAmount) missing.push("Biochar Amount");
    if (!biocharUnit) missing.push("Biochar Unit");
    if (!reactorTime) missing.push("Biochar Time in Reactor");
    if (!waterUsed) missing.push("Water Used");
    if (!discardedAmount) missing.push("Discarded Amount");
    if (!discardedUnit) missing.push("Discarded Unit");
    // Optional fields like photos are not enforced here
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
    Alert.alert("✅ Submitted", "Production data saved successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Production</Text>
      <Text style={styles.screenSubtitle}>Enter batch and production details. <Text style={styles.required}>*</Text> indicates required.</Text>

      {/* Card: Batch Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Batch Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Site <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Site name" value={site} onChangeText={setSite} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Biochar <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Biochar type" value={biochar} onChangeText={setBiochar} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Equipment <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="e.g. Kontikki" value={equipment} onChangeText={setEquipment} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>CSI Batch ID <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Batch ID" value={batchId} onChangeText={setBatchId} />
        </View>
      </View>

      {/* Card: Timing */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Timing</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Start Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.dateText}>📅 {formatDate(startDate)}</Text>
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
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Start Time <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.dateText}>⏰ {formatTime(startDate)}</Text>
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
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>End Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.dateText}>📅 {formatDate(endDate)}</Text>
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
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>End Time <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowEndTimePicker(true)}>
            <Text style={styles.dateText}>⏰ {formatTime(endDate)}</Text>
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
        </View>
      </View>

      {/* Card: Biomass Moisture */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Biomass Moisture</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Moisture % <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="%" keyboardType="numeric" value={moisturePercent} onChangeText={setMoisturePercent} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Weight <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Weight" keyboardType="numeric" value={moistureWeight} onChangeText={setMoistureWeight} />
        </View>
        <PhotoCapture label="Moisture Reading Photo" onChange={(data) => console.log(data)} />
        <DocumentUpload label="Supporting Document" onChange={(file) => console.log(file)} />
      </View>

      {/* Card: Biochar */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Biochar</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={biocharAmount} onChangeText={setBiocharAmount} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="kg, pound, bag" value={biocharUnit} onChangeText={setBiocharUnit} />
        </View>
        <PhotoCapture label="Biochar Produced Photo" onChange={(data) => console.log(data)} />
        <PhotoCapture label="Kiln Start Photo" onChange={(data) => console.log(data)} />
        <PhotoCapture label="Kiln End Photo" onChange={(data) => console.log(data)} />
      </View>

      {/* Card: Production Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Production Details</Text>
        <PhotoCapture label="Temperature Reading Photo" onChange={(data) => console.log(data)} />
        <View style={styles.field}>
          <Text style={styles.label}>Biochar Time in Reactor <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Approx time" value={reactorTime} onChangeText={setReactorTime} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Water Used <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Litres" keyboardType="numeric" value={waterUsed} onChangeText={setWaterUsed} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Biochar Discarded Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={discardedAmount} onChangeText={setDiscardedAmount} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Discarded Unit <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Unit" value={discardedUnit} onChangeText={setDiscardedUnit} />
        </View>
      </View>

      {/* Submit */}
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
  },
  dateButton: { paddingVertical: 14, justifyContent: "center" },
  dateText: { fontSize: 16, color: "#111827" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
