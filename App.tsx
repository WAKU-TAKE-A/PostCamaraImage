import React, { useState } from "react";
import { Button, Image, StyleSheet, Alert, TextInput, Text, ScrollView, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("http://192.168.0.1:1880/postfile");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera access is required");
    }
  };

  const openCamera = async () => {
    setUploadMessage(null); // Reset message when camera is opened
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      setUploadMessage("No image available!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any); // Type assertion to avoid warnings
  
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorDetails}`);
      }
  
      setUploadMessage("Upload successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setUploadMessage(`Upload error: ${error.message}`);
      } else {
        setUploadMessage("Upload error: Unexpected error occurred");
      }
    }
  };
  
  const { width, height } = Dimensions.get("window");
  const isPortrait = height > width;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Button title="Request Permissions" onPress={requestCameraPermission} />
      <Button title="Open Camera" onPress={openCamera} />
      {imageUri && <Image
          source={{ uri: imageUri }}
          style={{
            width: isPortrait ? 200 : 300,
            height: isPortrait ? 300 : 200,
            marginVertical: 16,
          }} />}
      <TextInput
        style={styles.input}
        value={uploadUrl}
        onChangeText={setUploadUrl}
      />
      {imageUri && <Button title="Upload" onPress={uploadImage} />}
      {uploadMessage && <Text style={styles.message}>{uploadMessage}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "green",
  },
});
