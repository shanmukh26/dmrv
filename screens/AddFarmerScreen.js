import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { DocumentUpload } from "../components/UploadComponents";

export default function AddFarmerScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [documents, setDocuments] = useState(null); // placeholder
  const [farms, setFarms] = useState([]);

  const addFarm = () => {
    const newFarm = {
      location: "",
      crop: "",
      area: "",
      polygon: null,
    };
    setFarms([...farms, newFarm]);
  };

  const handleSave = () => {
    if (!name || !dob) {
      Alert.alert("Error", "Farmer name and DOB are required");
      return;
    }
    console.log({ name, dob, documents, farms });
    Alert.alert("Success", "Farmer & Farms saved (mock)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Farmer</Text>

      {/* Farmer Details */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Farmer Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
        />
        <TouchableOpacity style={styles.docButton}>
          <Text style={styles.docText}>Attach Documents (optional)</Text>
          <DocumentUpload/>
        </TouchableOpacity>
      </View>

      {/* Farms */}
      <Text style={styles.sectionTitle}>Farms</Text>
      <FlatList
        data={farms}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.farmCard}>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapText}>📍 Select Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapText}>✏️ Draw Polygon</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Primary Crop"
              value={item.crop}
            />
            <Text style={styles.placeholder}>
              Area: [calculated from polygon]
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={addFarm}>
        <Text style={styles.addButtonText}>+ Add Farm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitText}>Save Farmer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f8f7" },
  title: { fontSize: 22, fontWeight: "700", color: "#25632D", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 10, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  docButton: { padding: 12, borderWidth: 1, borderColor: "#25632D", borderRadius: 8, marginBottom: 12 },
  docText: { color: "#25632D", textAlign: "center" },
  farmCard: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 10 },
  mapButton: { padding: 10, backgroundColor: "#eef6f3", borderRadius: 8, marginBottom: 8 },
  mapText: { color: "#25632D", textAlign: "center" },
  placeholder: { fontSize: 14, color: "#6b7280" },
  addButton: { backgroundColor: "#25632D", padding: 14, borderRadius: 10, marginBottom: 16 },
  addButtonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  submitButton: { backgroundColor: "#1e3a2a", padding: 16, borderRadius: 12 },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});

