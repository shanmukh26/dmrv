import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

export default function BiomassDeliveryScreen() {
  const navigation = useNavigation();

  // State variables
  const [biomassType, setBiomassType] = useState("");
  const [deliverySite, setDeliverySite] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [document, setDocument] = useState(null);

  // ✅ Upload document handler
  const handleUpload = async () => {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to allow access to upload.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setDocument(result.assets[0].uri);
    }
  };

  // Submit
  const handleSubmit = () => {
    const missing = [];
    if (!biomassType) missing.push("Biomass Type");
    if (!deliverySite) missing.push("Delivery Site");
    if (!deliveryDate) missing.push("Delivery Date");
    if (!weight) missing.push("Weight");
    if (!unit) missing.push("Unit");
    if (!vehicleType) missing.push("Vehicle Type");
    if (!street) missing.push("Street Address");
    if (!city) missing.push("City");
    if (!state) missing.push("State/Province");
    if (!postalCode) missing.push("Postal Code");
    if (!country) missing.push("Country");
    if (!document) missing.push("Documentation");

    if (missing.length) {
      Alert.alert("Missing Required Fields", missing.join(", "));
      return;
    }

    navigation.replace("SubmissionSuccess", {
      message: "Biomass Delivery Submitted Successfully!",
      redirectTo: "BiomassDelivery",
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Biomass Delivery</Text> 
      <Text style={styles.screenSubtitle}>Provide the delivery details below. <Text style={styles.required}>*</Text> indicates required fields.</Text>

      {/* Card: Delivery Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Biomass Type <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Paddy Straw, Cotton Stalk"
            value={biomassType}
            onChangeText={setBiomassType}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Delivery Site <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Biochar Plant, Gate 3"
            value={deliverySite}
            onChangeText={setDeliverySite}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Delivery Date <Text style={styles.required}>*</Text></Text>
          <TouchableOpacity
            style={[styles.input, styles.dateButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {deliveryDate ? deliveryDate.toLocaleDateString() : "Select Delivery Date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={deliveryDate}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDeliveryDate(selectedDate);
              }}
            />
          )}
        </View>
      </View>

      {/* Card: Shipping */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Shipping</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Weight <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Unit <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="kg or ton"
            value={unit}
            onChangeText={setUnit}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Vehicle Type <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Autorickshaw (Diesel)"
            value={vehicleType}
            onChangeText={setVehicleType}
          />
        </View>
      </View>

      {/* Card: Origin Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Origin Address</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Street Address <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="House No., Street"
            value={street}
            onChangeText={setStreet}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Street Address Line 2 </Text>
          <TextInput
            style={styles.input}
            placeholder="Area, Landmark (optional)"
            value={street2}
            onChangeText={setStreet2}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>City <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>State/Province <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Postal Code <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="PIN/ZIP"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Country <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
        </View>
      </View>

      {/* Card: Documentation */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Documentation <Text style={styles.required}>*</Text></Text>
        <Text style={styles.helperText}>Add a receipt, challan, or any supporting file.</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadText}>{document ? "Change Document" : "+ Upload Document"}</Text>
        </TouchableOpacity>
        {document && (
          <Image source={{ uri: document }} style={styles.uploadPreview} />
        )}
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Delivery</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f7", padding: 0 },
  contentContainer: { padding: 20, paddingBottom: 50 },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e5123",
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 16,
  },
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#25632D",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  required: { color: "#dc2626" },
  helperText: { fontSize: 14, color: "#6b7280", marginBottom: 12 },
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
  dateButton: {
    paddingVertical: 14,
    justifyContent: "center",
  },
  dateText: { fontSize: 16, color: "#111827" },
  uploadButton: {
    backgroundColor: "#25632D",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: { color: "#fff", fontWeight: "600" },
  uploadPreview: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#25632D",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
