import React, {useEffect} from 'react';
import {StyleSheet, View, Modal, Text, Pressable} from 'react-native';
import {getSize, screenWidth, screenHeight} from '@utils';
import {useAuth} from '@contexts';

export function Congrats({onPrevStep}) {
  const {signIn} = useAuth();

  useEffect(() => {
    setTimeout(async () => {
      // signIn();
      console.log('Congrats');
    }, 1000);
  }, []);

  return (
    <Modal isTVSelectable={true}>
      <Pressable onPress={onPrevStep}>
        <View style={styles.container}>
          <Text style={styles.text}>Congrats!</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  logo: {
    width: getSize(256),
    height: 56,
    marginBottom: 81,
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
  },
});
