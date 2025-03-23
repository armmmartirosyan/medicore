import React from 'react';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
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
  const {mutate: updateProfile, isLoading} = useUpdateProfile({
    onSuccess: e => {
      if (!e?.data) {
        return Toast.show({
          autoClose: 2000,
          title: 'Fail',
          type: ALERT_TYPE.DANGER,
          textBody: e.message || 'Unable to update the profile info.',
        });
      }
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The profile has been updated successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data.message || 'Unable to update the profile info.',
      });
    },
  });

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
