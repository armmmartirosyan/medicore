import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@components';

export function UpdateButton() {
  return (
    <View style={styles.view}>
      <Button onPress={() => {}} disabled={false} isLoading={false}>
        Update Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
