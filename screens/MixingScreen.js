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
  const [material, setMaterial] = useState("");
  const [wetAmount, setWetAmount] = useState("");
  const [wetUnit, setWetUnit] = useState("");
  const [moisturePct, setMoisturePct] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [finalUnit, setFinalUnit] = useState("");
  const [invSite, setInvSite] = useState("");
  const [invBiochar, setInvBiochar] = useState("");
  const [invEquipment, setInvEquipment] = useState("");

  const handleSubmit = () => {
    const missing = [];
    if (!mixSite) missing.push("Mix Site");
    if (!mixDate) missing.push("Mix Date/Time");
    if (!material) missing.push("Mix Materials");
    if (!wetAmount) missing.push("Wet Biochar Amount");
    if (!wetUnit) missing.push("Wet Unit");
    if (!moisturePct) missing.push("Moisture %");
    if (!finalAmount) missing.push("Final Mix Amount");
    if (!finalUnit) missing.push("Final Unit");
    if (!invSite) missing.push("Inventory Site");
    if (!invBiochar) missing.push("Inventory Biochar");
    if (!invEquipment) missing.push("Inventory Equipment");
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
    Alert.alert("✅ Submitted", "Mixing details saved successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Mixing</Text>
      <Text style={styles.screenSubtitle}>Provide mixing details below.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Site & Time</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Mix Site <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} value={mixSite} onChangeText={setMixSite} placeholder="Enter Site" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Mix Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>📅 {mixDate.toLocaleDateString()}</Text>
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
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Mix Time <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateText}>⏰ {mixDate.toLocaleTimeString()}</Text>
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
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Biochar Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Mix Materials <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={material} onValueChange={setMaterial} style={styles.picker}>
              <Picker.Item label="Select Material" value="" color="#9ca3af" />
              <Picker.Item label="Aid Wash" value="aid wash" />
              <Picker.Item label="Animal Bedding" value="animal bedding" />
              <Picker.Item label="Animal Feed" value="animal feed" />
              <Picker.Item label="Compost" value="compost" />
              <Picker.Item label="Construction Materials" value="construction" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Wet Biochar Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Wet Biochar Amount" value={wetAmount} onChangeText={setWetAmount} keyboardType="numeric" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit of Measure <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Unit (kg, bag...)" value={wetUnit} onChangeText={setWetUnit} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Moisture Content % <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Moisture %" value={moisturePct} onChangeText={setMoisturePct} keyboardType="numeric" />
        </View>
        <PhotoCapture label="Moisture Meter Capture" onChange={(d) => console.log("Moisture Photo:", d)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Final Mix Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Final Mix Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Final Mix Amount" value={finalAmount} onChangeText={setFinalAmount} keyboardType="numeric" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit of Measure <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Unit (kg, bag...)" value={finalUnit} onChangeText={setFinalUnit} />
        </View>
        <PhotoCapture label="Post Mix Photo" onChange={(d) => console.log("Post Mix Photo:", d)} />
        <DocumentUpload label="Supporting Document" onChange={(d) => console.log("Doc:", d)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Inventory Filters</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Site <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Site" value={invSite} onChangeText={setInvSite} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Biochar <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Biochar" value={invBiochar} onChangeText={setInvBiochar} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Pyrolysis Equipment <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Equipment" value={invEquipment} onChangeText={setInvEquipment} />
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
  required: { color: "#dc2626" },
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
  field: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
  },
  pickerWrapper: { padding: 0 },
  picker: { height: 58, width: "100%", color: "#111827" },
  dateButton: { paddingVertical: 14, justifyContent: "center" },
  dateText: { fontSize: 16, color: "#111827" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
