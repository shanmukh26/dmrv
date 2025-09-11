// screens/BiocharInvoicingScreen.js
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

export default function InvoicingScreen() {
  // Delivery details
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [endUse, setEndUse] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDeliveryDate, setShowDeliveryDate] = useState(false);

  // Moisture content
  const [moisture, setMoisture] = useState("");

  // Delivery address
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");

  // Emission details
  const [originSite, setOriginSite] = useState("");
  const [vehicle, setVehicle] = useState("");

  // Other
  const [recipient, setRecipient] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [proofSale, setProofSale] = useState(null);
  const [proofWeight, setProofWeight] = useState(null);

  const handleSubmit = () => {
    const missing = [];
    if (!amount) missing.push("Amount");
    if (!unit) missing.push("Unit");
    if (!endUse) missing.push("End Use");
    if (!deliveryDate) missing.push("Delivery Date");
    if (!street1) missing.push("Street Address");
    if (!city) missing.push("City");
    if (!state) missing.push("State/Province");
    if (!postal) missing.push("Postal Code");
    if (!country) missing.push("Country");
    if (!originSite) missing.push("Origin Site");
    if (!vehicle) missing.push("Vehicle Type");
    if (!currency) missing.push("Currency");
    if (!unitPrice) missing.push("Unit Price");
    if (!proofSale) missing.push("Proof of Sale");
    if (!proofWeight) missing.push("Proof of Weight");
    if (!disclaimerChecked) missing.push("Disclaimer");
    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }
    Alert.alert("✅ Submitted", "Biochar Invoice saved successfully!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Biochar Invoicing</Text>
      <Text style={styles.screenSubtitle}>Fill in invoicing details. <Text style={styles.required}>*</Text> indicates required.</Text>

      {/* Card: Delivery Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Amount <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Amount" value={amount} onChangeText={setAmount} />
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
          <Text style={styles.label}>End Use Type <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={endUse} onValueChange={setEndUse} style={styles.picker}>
              <Picker.Item label="Select End Use" value="" color="#9ca3af" />
              <Picker.Item label="Soil Application" value="soil application" />
              <Picker.Item label="Asphalt" value="asphalt" />
              <Picker.Item label="Cement" value="cement" />
              <Picker.Item label="Cosmetics" value="cosmetics" />
              <Picker.Item label="Water Filtration" value="water filtration" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Delivery Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity style={[styles.input, styles.dateButton]} onPress={() => setShowDeliveryDate(true)}>
            <Text style={styles.dateText}>📅 {deliveryDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDeliveryDate && (
            <DateTimePicker
              value={deliveryDate}
              mode="date"
              display="calendar"
              onChange={(e, selected) => {
                setShowDeliveryDate(false);
                if (selected) setDeliveryDate(selected);
              }}
            />
          )}
        </View>
      </View>

      {/* Card: Moisture Content */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Moisture Content</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Moisture Content % <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Moisture %" value={moisture} onChangeText={setMoisture} keyboardType="numeric" />
        </View>
        <PhotoCapture label="Moisture Content Photo" onChange={(d) => console.log("Moisture Photo:", d)} />
      </View>

      {/* Card: Delivery Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Street Address <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Street Address" value={street1} onChangeText={setStreet1} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Street Address Line 2</Text>
          <TextInput style={styles.input} placeholder="Enter Address Line 2" value={street2} onChangeText={setStreet2} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>City <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter City" value={city} onChangeText={setCity} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>State / Province <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter State" value={state} onChangeText={setState} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Postal Code <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Postal Code" value={postal} onChangeText={setPostal} keyboardType="numeric" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Country <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Country" value={country} onChangeText={setCountry} />
        </View>
      </View>

      {/* Card: Emission Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Emission Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Origin Site <Text style={styles.required}>*</Text>   </Text>
          <TextInput style={styles.input} placeholder="Enter Origin Site" value={originSite} onChangeText={setOriginSite} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Vehicle Type <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={vehicle} onValueChange={setVehicle} style={styles.picker}>
              <Picker.Item label="Select Vehicle" value="" color="#9ca3af" />
              <Picker.Item label="Carhauler (Tractor-Trailer)" value="tractor-trailer" />
              <Picker.Item label="Auto Rickshaw (Diesel)" value="rickshaw-diesel" />
              <Picker.Item label="Auto Rickshaw (Petrol)" value="rickshaw-petrol" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Card: Documents */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Documents </Text>
        <DocumentUpload label="Proof of Sale"  onChange={(d) => setProofSale(d)} />
        <DocumentUpload label="Proof of Weight" onChange={(d) => setProofWeight(d)} />
      </View>

      {/* Card: Inventory Filters */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Inventory Filters </Text>
        <View style={styles.field}>
          <Text style={styles.label}>Site <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Site" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Biochar <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Biochar" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Pyrolysis Equipment <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Equipment" />
        </View>
      </View>

      {/* Card: Other */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Other</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Recipient Name <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Recipient Name" value={recipient} onChangeText={setRecipient} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Recipient Email <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Recipient Email" value={recipientEmail} onChangeText={setRecipientEmail} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Currency <Text style={styles.required}>*</Text></Text>
          <View style={[styles.input, styles.pickerWrapper]}>
            <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
              <Picker.Item label="Select Currency" value="" color="#9ca3af" />
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="INR" value="INR" />
              <Picker.Item label="EUR" value="EUR" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit Price <Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Enter Unit Price" value={unitPrice} onChangeText={setUnitPrice} keyboardType="numeric" />
        </View>
        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setDisclaimerChecked(!disclaimerChecked)}>
            <Text style={{ fontSize: 18 }}>{disclaimerChecked ? "✅" : "⬜"}</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            Purchaser assures that they or the end user will not use biochar for
            energy production or combustion of any kind, and will make no claim to
            the carbon sequestration from the use of this product.
          </Text>
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
  pickerWrapper: { padding: 0 },
  picker: { height: 50, width: "100%", color: "#111827" },
  dateButton: { paddingVertical: 14, justifyContent: "center" },
  dateText: { fontSize: 16, color: "#111827" },
  disclaimerBox: { flexDirection: "row", alignItems: "flex-start", marginTop: 8, marginBottom: 4 },
  checkbox: { marginRight: 10 },
  disclaimerText: { flex: 1, fontSize: 14, color: "#444" },
  submitButton: { backgroundColor: "#25632D", paddingVertical: 16, borderRadius: 12, marginTop: 8, marginBottom: 40 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16, letterSpacing: 0.2 },
});
