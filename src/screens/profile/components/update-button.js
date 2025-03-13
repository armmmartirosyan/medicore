import React from 'react';
import moment from 'moment/moment';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {profileSelectors} from '@store/profile';
import {useUpdateProfile} from '@api-hooks';
import {Button} from '@components';

export function UpdateButton() {
  const firstName = useSelector(profileSelectors.fNameSelector);
  const lastName = useSelector(profileSelectors.lNameSelector);
  const phoneNumber = useSelector(profileSelectors.phoneNumberSelector);
  const phoneCode = useSelector(profileSelectors.phoneCodeSelector);
  const birthDate = useSelector(profileSelectors.birthDateSelector);
  const {mutate: updateProfile, isLoading} = useUpdateProfile();

  const handleUpdate = () => {
    const phone = phoneCode + phoneNumber;

    updateProfile({
      firstName,
      lastName,
      phone,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
    });
  };

  return (
    <View style={styles.view}>
      <Button onPress={handleUpdate} disabled={false} isLoading={isLoading}>
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
