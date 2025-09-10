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

// ✅ Upload document handler (check permission first)
const handleUpload = async () => {
  // check existing permission
  let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

  // if not granted, request again
  if (status !== "granted") {
    const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    status = newStatus;
  }

  // if still denied, stop
  if (status !== "granted") {
    Alert.alert("Permission Denied", "You need to allow access to upload.");
    return;
  }

  // ✅ now safe to open picker
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All, // images + videos
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.canceled) {
    setDocument(result.assets[0].uri);
  }
};


  // Submit
  const handleSubmit = () => {
    if (!biomassType || !deliverySite || !weight || !unit || !vehicleType) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    navigation.replace("SubmissionSuccess", {
      message: "Biomass Delivery Submitted Successfully!",
      redirectTo: "BiomassDelivery",
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Section: Details */}
      <Text style={styles.sectionTitle}>Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Biomass Type"
        value={biomassType}
        onChangeText={setBiomassType}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Site"
        value={deliverySite}
        onChangeText={setDeliverySite}
      />

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {deliveryDate
            ? deliveryDate.toLocaleDateString()
            : "Select Delivery Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deliveryDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDeliveryDate(selectedDate);
            }
          }}
        />
      )}

      {/* Section: Shipping */}
      <Text style={styles.sectionTitle}>Shipping</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Unit (kg/ton)"
        value={unit}
        onChangeText={setUnit}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type (e.g., Autorickshaw Diesel)"
        value={vehicleType}
        onChangeText={setVehicleType}
      />

      {/* Section: Origin Address */}
      <Text style={styles.sectionTitle}>Origin Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address Line 2"
        value={street2}
        onChangeText={setStreet2}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State/Province"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />

      {/* Section: Documentation */}
      <Text style={styles.sectionTitle}>Documentation</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadText}>+ Upload Document</Text>
      </TouchableOpacity>
      {document && (
        <Image source={{ uri: document }} style={styles.uploadPreview} />
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25632D",
    marginTop: 20,
    marginBottom: 10,
  },
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
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: { fontSize: 16, color: "#333" },
  uploadButton: {
    backgroundColor: "#25632D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: { color: "#fff", fontWeight: "600" },
  uploadPreview: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#25632D",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});