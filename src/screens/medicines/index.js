import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export function Medicines() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footerNav}>
        <Text>Medicines</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
