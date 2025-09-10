// screens/MoistureContentScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MoistureContentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moisture Content Measurement</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DryOven")}
      >
        <Text style={styles.buttonText}>Dry Oven</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BulkDensity")}
      >
        <Text style={styles.buttonText}>Bulk Density</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Meter")}
      >
        <Text style={styles.buttonText}>Meter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#25632D" },
  button: { backgroundColor: "#25632D", padding: 15, borderRadius: 8, marginVertical: 10, width: "80%" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
