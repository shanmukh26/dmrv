import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AddFarmerScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");

  const handleSave = () => {
    if (!name || !address || !crop || !area) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    console.log({ name, address, crop, area });
    Alert.alert("Success", "Farmer added successfully (mock)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Farmer</Text>

      <TextInput style={styles.input} placeholder="Farmer Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Crop" value={crop} onChangeText={setCrop} />
      <TextInput style={styles.input} placeholder="Area (in acres)" value={area} onChangeText={setArea} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Farmer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#25632D" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: { backgroundColor: "#25632D", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "600" },
});
