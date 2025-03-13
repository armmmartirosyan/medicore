import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';
import {ProceduresBlock, DoctorsBlock} from './components';

function HomeComponent() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ProceduresBlock />
      <DoctorsBlock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize(20),
    position: 'relative',
  },
});

export const Home = withSafeArea(HomeComponent);
