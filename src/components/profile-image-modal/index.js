import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {useUpdateProfileImage, useDeleteProfileImage} from '@api-hooks';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faImage} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {HeadText, Button} from '@components';
import {COLORS} from '@constants';
import {profileSelectors} from '@store/profile';
import {useSelector} from 'react-redux';

export function ProfileImageModal({visible, onClose}) {
  const imageUrl = useSelector(profileSelectors.imageSelector);

  const {mutate: uploadImage} = useUpdateProfileImage({
    onSuccess: onClose,
    onError: onClose,
  });
  const {mutate: deleteImage} = useDeleteProfileImage({
    onSuccess: onClose,
    onError: onClose,
  });

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        uploadImage(image);
      }
    });
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <HeadText style={styles.title}>Profile Image</HeadText>
          <TouchableOpacity style={styles.optionButton} onPress={selectImage}>
            <FontAwesomeIcon
              icon={faImage}
              size={24}
              color={COLORS.ACTIVE_BLUE}
            />
            <Text style={styles.optionText}>Update Image</Text>
          </TouchableOpacity>
          {imageUrl && (
            <TouchableOpacity style={styles.optionButton} onPress={deleteImage}>
              <FontAwesomeIcon icon={faTrash} size={24} color={COLORS.RED} />
              <Text style={[styles.optionText, {color: COLORS.RED}]}>
                Delete Image
              </Text>
            </TouchableOpacity>
          )}
          <Button
            variant={Button.variants.secondary}
            onPress={onClose}
            style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: COLORS.ACTIVE_BLUE,
  },
  cancelButton: {
    marginTop: 20,
  },
});
