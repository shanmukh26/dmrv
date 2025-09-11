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
  const [category, setCategory] = useState("");
  const [unitType, setUnitType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [notes, setNotes] = useState("");
  const [receiptDoc, setReceiptDoc] = useState(null);

  const handleSubmit = () => {
    const missing = [];
    if (!category) missing.push("Category");
    if (!unitType) missing.push("Unit Type");
    if (!quantity) missing.push("Quantity");
    if (!unit) missing.push("Units");
    if (!date) missing.push("Date");
    if (!notes) missing.push("Notes");
    if (!receiptDoc) missing.push("Documentation");
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
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

  const unitOptions = unitType === "custom" ? customUnits : standardUnits;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Receipt</Text>
      <Text style={styles.screenSubtitle}>Record purchase or usage details.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Basics</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
              <Picker.Item label="Select Category" value="" color="#9ca3af" />
              <Picker.Item label="Fuel" value="fuel" />
              <Picker.Item label="Material" value="material" />
              <Picker.Item label="Electricity" value="electricity" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit Type <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={unitType} onValueChange={setUnitType} style={styles.picker}>
              <Picker.Item label="Select Unit Type" value="" color="#9ca3af" />
              <Picker.Item label="Standard" value="standard" />
              <Picker.Item label="Custom" value="custom" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Quantity <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Units <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={unit} onValueChange={setUnit} style={styles.picker}>
              <Picker.Item label="Select Units" value="" color="#9ca3af" />
              {unitOptions.map((opt) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowDate(true)}>
            <Text style={styles.dateText}>📅 {date.toLocaleDateString()}</Text>
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
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Documentation</Text>
        <DocumentUpload label="Upload Receipt/Document" onChange={(d) => setReceiptDoc(d)} />
        <View style={styles.field}>
          <Text style={styles.label}>Notes <Text style={styles.required}>*</Text></Text>
          <TextInput style={[styles.input, { height: 100, textAlignVertical: "top" }]} placeholder="Enter any notes" multiline value={notes} onChangeText={setNotes} />
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
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12, backgroundColor: "#f9fafb" },
  pickerWrapper: { padding: 0 },
  picker: { height: 58, width: "100%", color: "#111827" },
  dateButton: { paddingVertical: 14, justifyContent: "center" },
  dateText: { fontSize: 16, color: "#111827" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
  required: { color: "#dc2626" },
});
