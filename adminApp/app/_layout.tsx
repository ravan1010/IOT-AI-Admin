import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUuid, setHasUuid] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const uuid = await AsyncStorage.getItem('user_uuid');
      if (uuid) {
        setHasUuid(true);
      }
    } catch (e) {
      console.error("Failed to load UUID", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    // Determine if user is currently in the (auth) group

    if (hasUuid) {
      // 1. If no UUID and not in Auth, go to Register
      router.replace('/(tabs)');
    }else{
      router.replace('/(auth)/login')
    }
  }, [hasUuid, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login.tsx" />
      <Stack.Screen name="(tabs)/index.tsx" />
    </Stack>
  );
}