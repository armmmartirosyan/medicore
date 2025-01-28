import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '@contexts';

export function Home() {
  const {signOut} = useAuth();
  return (
    <View style={styles.wrapper}>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut} style={styles.touchable}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'grey',
  },
  touchable: {
    backgroundColor: 'red',
    marginTop: 100,
  },
});
