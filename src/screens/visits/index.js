import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export function Visits() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footerNav}>
        <Text>Visits</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
