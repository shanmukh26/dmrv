// dmrv-app/components/UploadComponents.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker"; // install: expo install @react-native-picker/picker

// 📅 Format date
const formatDate = (date) =>
  date.getDate().toString().padStart(2, "0") +
  "/" +
  (date.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  date.getFullYear();

// ⏰ Format time
const formatTime = (date) =>
  date.getHours().toString().padStart(2, "0") +
  ":" +
  date.getMinutes().toString().padStart(2, "0");

const formatTimestamp = (date) =>
  formatDate(date) +
  " " +
  formatTime(date) +
  ":" +
  date.getSeconds().toString().padStart(2, "0");

// 📸 Reusable Photo Capture
export function PhotoCapture({ label, onChange }) {
  const [photo, setPhoto] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const takePhoto = async () => {
    let { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Camera permission required");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const now = new Date();
      const time = formatTimestamp(now);

      setPhoto(uri);
      setTimestamp(time);
      onChange({ uri, time });
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setTimestamp(null);
    onChange(null);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      {!photo ? (
        <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
          <Text style={styles.uploadText}>📸 Take Photo</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <Text style={styles.timestamp}>{timestamp}</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <TouchableOpacity style={styles.retakeButton} onPress={takePhoto}>
              <Text style={styles.retakeText}>♻ Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={removePhoto}>
              <Text style={styles.removeText}>❌ Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

// 📄 Reusable Document Upload with Dropdown
export function DocumentUpload({ label, onChange }) {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState("");

  const chooseFromGallery = async () => {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      Alert.alert("Gallery permission required");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    if (!result.canceled) {
      const now = new Date();
      const time = formatTimestamp(now);
      setFile({ uri: result.assets[0].uri, time });
      onChange({ uri: result.assets[0].uri, time });
    }
  };

  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      const now = new Date();
      const time = formatTimestamp(now);
      setFile({ uri: result.uri, time });
      onChange({ uri: result.uri, time });
    }
  };

  const removeFile = () => {
    setFile(null);
    setOption("");
    onChange(null);
  };

  const handleSelect = (value) => {
    setOption(value);
    if (value === "gallery") chooseFromGallery();
    else if (value === "file") chooseFile();
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={option}
        onValueChange={handleSelect}
        style={styles.picker}
      >
        <Picker.Item label="Select option" value="" />
        <Picker.Item label="📂 Choose from Gallery" value="gallery" />
        <Picker.Item label="📄 Choose File" value="file" />
      </Picker>

      {file && (
        <View style={{ marginTop: 10 }}>
          <Text>📎 Selected: {file.uri}</Text>
          <Text>🕒 Time: {file.time}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={removeFile}>
            <Text style={styles.removeText}>❌ Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },
  uploadButton: {
    backgroundColor: "#25632D",
    padding: 10,
    borderRadius: 6,
    marginVertical: 5,
  },
  uploadText: { color: "#fff", fontWeight: "600" },
  previewContainer: { alignItems: "center", marginVertical: 10 },
  preview: { width: "100%", height: 150, borderRadius: 8 },
  timestamp: { marginTop: 4, color: "gray", fontSize: 12 },
  retakeButton: { backgroundColor: "orange", padding: 6, borderRadius: 6, marginHorizontal: 4 },
  retakeText: { color: "#fff" },
  removeButton: { backgroundColor: "red", padding: 6, borderRadius: 6, marginTop: 6 },
  removeText: { color: "#fff" },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
  },
});
