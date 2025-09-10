import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SubmissionSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { message, redirectTo } = route.params || {
    message: "Successfully Submitted!",
    redirectTo: "Home",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>✅ {message}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace(redirectTo)}
      >
        <Text style={styles.buttonText}>Add New Record</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555", marginTop: 15 }]}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successText: { fontSize: 20, fontWeight: "bold", marginBottom: 30, color: "#25632D", textAlign: "center" },
  button: { backgroundColor: "#25632D", paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
