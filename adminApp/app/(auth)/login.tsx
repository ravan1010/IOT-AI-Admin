import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Add this for redirection


const Register = () => {
  const [uuid, setUuid] = useState(''); // Simplified state
  const router = useRouter();

  const handleRegister = async () => {
    if (!uuid) {
      Alert.alert("Error", "Please enter a UUID");
      return;
    }

    try {
      /**
       * CRITICAL: Use your machine's IP (e.g., 192.168.1.5) 
       * instead of localhost if testing on a physical device.
       */
      // const API_URL = 'http://192.168.1.15:3000/api/login';
      
      const response = await axios.post(`http://10.243.93.169:3000/api/login`, { uuid });

      // Save to Local Storage
      // Assuming your backend returns the uuid in response.data.user
      await AsyncStorage.setItem('user_uuid', response.data.user);

      Alert.alert("Success", "Account created!", [
        { text: "OK", onPress: () => router.replace('/(tabs)') } // Redirect to Home
      ]);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter UUID" 
        value={uuid}
        onChangeText={(text) => setUuid(text)} // Fixed: Pass the text value correctly
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 } // Fixed: '#fff' instead of '#white'
});

export default Register;