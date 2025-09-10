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
  const [unit, setUnit] = useState("kg");
  const [endUse, setEndUse] = useState("soil application");
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
  const [vehicle, setVehicle] = useState("tractor-trailer");

  // Other
  const [recipient, setRecipient] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [unitPrice, setUnitPrice] = useState("");
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  const handleSubmit = () => {
    if (!disclaimerChecked) {
      Alert.alert("⚠ Disclaimer Required", "You must agree to the disclaimer.");
      return;
    }
    Alert.alert("✅ Submitted", "Biochar Invoice saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Delivery Details */}
      <Text style={styles.sectionTitle}>Delivery Details</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Unit of Measure</Text>
      <Picker selectedValue={unit} onValueChange={setUnit} style={styles.picker}>
        <Picker.Item label="Kg" value="kg" />
        <Picker.Item label="Pound" value="pound" />
        <Picker.Item label="Bag (20kg)" value="bag" />
      </Picker>

      <Text style={styles.label}>End Use Type</Text>
      <Picker
        selectedValue={endUse}
        onValueChange={setEndUse}
        style={styles.picker}
      >
        <Picker.Item label="Soil Application" value="soil application" />
        <Picker.Item label="Asphalt" value="asphalt" />
        <Picker.Item label="Cement" value="cement" />
        <Picker.Item label="Cosmetics" value="cosmetics" />
        <Picker.Item label="Water Filtration" value="water filtration" />
      </Picker>

      <Text style={styles.label}>Delivery Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDeliveryDate(true)}
      >
        <Text>📅 {deliveryDate.toLocaleDateString()}</Text>
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

      {/* Moisture Content */}
      <Text style={styles.sectionTitle}>Moisture Content</Text>
      <Text style={styles.label}>Moisture Content %</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Moisture %"
        value={moisture}
        onChangeText={setMoisture}
      />
      <PhotoCapture
        label="Moisture Content Photo"
        onChange={(d) => console.log("Moisture Photo:", d)}
      />

      {/* Delivery Address */}
      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <Text style={styles.label}>Street Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Street Address"
        value={street1}
        onChangeText={setStreet1}
      />
      <Text style={styles.label}>Street Address Line 2</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Address Line 2"
        value={street2}
        onChangeText={setStreet2}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.label}>State / Province</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={state}
        onChangeText={setState}
      />
      <Text style={styles.label}>Postal Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Postal Code"
        value={postal}
        onChangeText={setPostal}
      />
      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Country"
        value={country}
        onChangeText={setCountry}
      />

      {/* Emission Details */}
      <Text style={styles.sectionTitle}>Emission Details</Text>
      <Text style={styles.label}>Origin Site</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Origin Site"
        value={originSite}
        onChangeText={setOriginSite}
      />
      <Text style={styles.label}>Vehicle Type</Text>
      <Picker selectedValue={vehicle} onValueChange={setVehicle} style={styles.picker}>
        <Picker.Item label="Carhauler (Tractor-Trailer)" value="tractor-trailer" />
        <Picker.Item label="Auto Rickshaw (Diesel)" value="rickshaw-diesel" />
        <Picker.Item label="Auto Rickshaw (Petrol)" value="rickshaw-petrol" />
      </Picker>

      {/* Documents */}
      <Text style={styles.sectionTitle}>Documents</Text>
      <DocumentUpload
        label="Proof of Sale"
        onChange={(d) => console.log("Proof of Sale:", d)}
      />
      <DocumentUpload
        label="Proof of Weight"
        onChange={(d) => console.log("Proof of Weight:", d)}
      />

      {/* Inventory Filter */}
      <Text style={styles.sectionTitle}>Inventory Filters</Text>
      <Text style={styles.label}>Site</Text>
      <TextInput style={styles.input} placeholder="Enter Site" />
      <Text style={styles.label}>Biochar</Text>
      <TextInput style={styles.input} placeholder="Enter Biochar" />
      <Text style={styles.label}>Pyrolysis Equipment</Text>
      <TextInput style={styles.input} placeholder="Enter Equipment" />

      {/* Other */}
      <Text style={styles.sectionTitle}>Other</Text>
      <Text style={styles.label}>Recipient Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Recipient Name"
        value={recipient}
        onChangeText={setRecipient}
      />
      <Text style={styles.label}>Recipient Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Recipient Email"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
      />
      <Text style={styles.label}>Currency</Text>
      <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="INR" value="INR" />
        <Picker.Item label="EUR" value="EUR" />
      </Picker>
      <Text style={styles.label}>Unit Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Unit Price"
        value={unitPrice}
        onChangeText={setUnitPrice}
      />

      {/* Disclaimer */}
      <View style={styles.disclaimerBox}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setDisclaimerChecked(!disclaimerChecked)}
        >
          <Text style={{ fontSize: 18 }}>
            {disclaimerChecked ? "✅" : "⬜"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.disclaimerText}>
          Purchaser assures that they or the end user will not use biochar for
          energy production or combustion of any kind, and will make no claim to
          the carbon sequestration from the use of this product.
        </Text>
      </View>

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
    marginTop: 20,
    marginBottom: 10,
    color: "#25632D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  label: { fontWeight: "600", marginBottom: 6 },
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
  disclaimerBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },
  checkbox: { marginRight: 10 },
  disclaimerText: { flex: 1, fontSize: 14, color: "#444" },
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
