import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      <Tabs />
    </SafeAreaProvider>
  );
}
