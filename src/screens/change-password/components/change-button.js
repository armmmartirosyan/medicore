import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@components';

export function ChangeButton() {
  return (
    <View style={styles.view}>
      <Button
        onPress={() => {}}
        disabled={false}
        isLoading={false}
        style={styles.button}>
        Change Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});
