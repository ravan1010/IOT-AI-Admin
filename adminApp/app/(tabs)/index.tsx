import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BleAdvertiser from 'react-native-ble-advertiser';

import Bluetooth_permission from '../../hooks/bluetooth_permission';

export default function HomeScreen() {
  const { requestPermissions } = Bluetooth_permission();

  const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('user_uuid')
  } catch(e) {
    // remove error
    console.error(e)
  }
  console.log('Done.')
}
  
  // 1. Create a state for the UUID
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      // 2. Fetch UUID inside an async function
      const storedUuid = await AsyncStorage.getItem('user_uuid');
      setUuid(storedUuid);
      console.log(storedUuid)
      
      // 3. Handle Permissions
      if (!requestPermissions) {
        console.warn('Bluetooth permissions were not granted.');
      } else {
        console.log('Bluetooth permissions granted.');
        
        // 4. Only start advertising if we have a UUID
        if (storedUuid) {
          registerAdmin(storedUuid);
        }
      }
    };

    initializeApp();
  }, [requestPermissions]); // Re-run if permissions status changes

  const registerAdmin = async (id: string) => {

    BleAdvertiser.setCompanyId(0x004C)

    try {
      // Ensure the ID is valid for BLE (must be a valid UUID string)
      await BleAdvertiser.broadcast(
        id,
        [1, 2, 3],
        {
          advertiseMode: 2,
          txPowerLevel: 3,
          connectable: false,
          includeDeviceName: false,
        }
      );
      Alert.alert('Admin Ready', 'BLE advertising started');
    } catch (err) {
      console.error("BLE Broadcast Error:", err);
    } 
  };

  return (
      <View style={styles.container}>
        <View style={styles.button}>
          {/* 5. Handle the loading state or null state */}
          <Text style={styles.title}>UUID: {uuid}</Text>
            <TouchableOpacity
                style={styles.button} 
                onPress={removeValue}
              >
                <Text style={styles.title}>Delete Local Data</Text>
              </TouchableOpacity>
            </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: 'white' },
  button: { backgroundColor: '#30036eff', padding: 15, borderRadius: 20, alignItems: 'center' },
});

// ... styles stay the same
