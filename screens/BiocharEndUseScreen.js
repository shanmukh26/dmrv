// screens/EndUseScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BiocharEndUseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select End Use</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Mixing")}
      >
        <Text style={styles.buttonText}>Mixing</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Application")}
      >
        <Text style={styles.buttonText}>Application</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Invoicing")}
      >
        <Text style={styles.buttonText}>Biochar Invoicing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "#25632D",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
