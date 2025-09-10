// screens/ReceiptScreen.js
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
import { DocumentUpload } from "../components/UploadComponents";

export default function ReceiptScreen() {
  const [category, setCategory] = useState("fuel");
  const [unitType, setUnitType] = useState("standard");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    Alert.alert("✅ Submitted", "Receipt details saved successfully!");
  };

  // Standard & Custom unit lists
  const standardUnits = [
    { label: "Biofuels (Litres)", value: "biofuels" },
    { label: "Biomass (Kg)", value: "biomass" },
    { label: "Diesel (Litres)", value: "diesel" },
    { label: "Motor Gasoline (Litres)", value: "motor_gasoline" },
    { label: "Propane (Litres)", value: "propane" },
  ];

  const customUnits = [
    { label: "Kon-Tiki Methane Emissions", value: "methane" },
    { label: "Margin of Safety", value: "safety" },
    { label: "Transportation", value: "transportation" },
  ];

  const unitOptions = unitType === "standard" ? standardUnits : customUnits;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Receipt Entry</Text>

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        <Picker.Item label="Fuel" value="fuel" />
        <Picker.Item label="Material" value="material" />
        <Picker.Item label="Electricity" value="electricity" />
      </Picker>

      {/* Unit Type */}
      <Text style={styles.label}>Unit Type</Text>
      <Picker selectedValue={unitType} onValueChange={setUnitType} style={styles.picker}>
        <Picker.Item label="Standard" value="standard" />
        <Picker.Item label="Custom" value="custom" />
      </Picker>

      {/* Quantity */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      {/* Units Dropdown */}
      <Text style={styles.label}>Units</Text>
      <Picker selectedValue={unit} onValueChange={setUnit} style={styles.picker}>
        {unitOptions.map((opt) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>

      {/* Date */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDate(true)}>
        <Text>📅 {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selected) => {
            setShowDate(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      {/* Documentation */}
      <Text style={styles.label}>Documentation</Text>
      <DocumentUpload label="Upload Document" onChange={(d) => console.log(d)} />

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Enter any notes"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#25632D" },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
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
