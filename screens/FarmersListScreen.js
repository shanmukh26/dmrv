import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const mockFarmers = [
  { id: "1", name: "Ravi", address: "Hyderabad", crop: "Paddy", area: "2 acres" },
  { id: "2", name: "Sita", address: "Warangal", crop: "Cotton", area: "3 acres" },
];

export default function FarmersListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmers List</Text>
      <FlatList
        data={mockFarmers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Address: {item.address}</Text>
            <Text style={styles.text}>Crop: {item.crop}</Text>
            <Text style={styles.text}>Area: {item.area}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#25632D" },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  text: { fontSize: 16, marginBottom: 5, color: "#333" },
});
