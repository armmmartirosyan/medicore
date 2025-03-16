import React from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {AccountHeader, InputWrapperView} from '@components';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@constants';
import {withSafeArea} from '@hoc';
import {
  BirthDate,
  FirstName,
  LastName,
  Phone,
  UpdateButton,
} from './components';

function ProfileComponent() {
  const navigation = useNavigation();

  return (
    <InputWrapperView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <AccountHeader showName={false} allowChangePicture={true} />
        <View />
      </View>

      <ScrollView style={styles.list}>
        <FirstName />
        <LastName />
        <Phone />
        <BirthDate />
      </ScrollView>
      <UpdateButton />
    </InputWrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
    position: 'relative',
    top: 20,
  },
  list: {
    flex: 1,
  },
});

export const Profile = withSafeArea(ProfileComponent);
