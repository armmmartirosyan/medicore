import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {HeadText, InputWrapperView, Button, Select, Input} from '@components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark, faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import {visitSelectors} from '@store/visit/selectors';
import {changeVisitState} from '@store/visit/slice';
import {useAddVisitProcedure, useGetProcedures} from '@api-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS} from '@constants';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {launchImageLibrary} from 'react-native-image-picker';
import {getSize} from '@utils';

export function AddVisitProcedure({modalVisible, closeModal, visitId}) {
  const dispatch = useDispatch();
  const notes = useSelector(visitSelectors.notes);
  const procedureId = useSelector(visitSelectors.procedureId);
  const [images, setImages] = useState([]);

  const {data: procedures} = useGetProcedures();

  const {mutate: addProcedure, isLoading: addIsLoading} = useAddVisitProcedure({
    onSuccess: () => {
      closeModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The procedure added successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to add the procedure.',
      });
    },
  });

  const handleValueChange = newValue => {
    dispatch(changeVisitState(newValue));
  };

  const handleAdd = () => {
    const req = {
      notes,
      visitId,
      procedureId,
      images,
    };

    addProcedure(req);
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setImages(prev => [...prev, image]);
      }
    });
  };

  const removeImage = image => {
    setImages(prev => prev.filter(i => i.uri !== image.uri));
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      style={styles.modal}>
      <InputWrapperView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headWrapper}>
            <HeadText>Add Visit Procedure</HeadText>
            <Pressable onPress={closeModal}>
              <FontAwesomeIcon icon={faXmark} size={20} color="black" />
            </Pressable>
          </View>
          <Select
            data={procedures?.data}
            containerStyle={styles.input}
            placeholder="Select a Procedure"
            renderCurrentItem={item => item.name}
            onSelect={selected => handleValueChange({procedureId: selected.id})}
          />
          <Input
            value={notes}
            placeholder="Notes"
            onChangeText={newNotes => handleValueChange({notes: newNotes})}
            containerStyle={styles.input}
          />

          <TouchableOpacity style={styles.imageUploadBtn} onPress={selectImage}>
            <Text style={styles.imageUploadText}>Add image</Text>
          </TouchableOpacity>

          {images.map(image => (
            <View style={styles.imageWrapper} key={image.uri}>
              <Image source={{uri: image.uri}} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => removeImage(image)}>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  color={COLORS.RED}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.view}>
            <Button
              isLoading={addIsLoading}
              onPress={handleAdd}
              disabled={false}>
              Add
            </Button>
          </View>
        </View>
      </InputWrapperView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  headWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {marginBottom: 20},
  view: {
    width: '100%',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.ACTIVE_BLUE,
    marginLeft: 10,
    width: '85%',
  },
  imageUploadBtn: {
    width: '100%',
    height: getSize(45),
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    marginBottom: 20,
    justifyContent: 'center',
  },
  imageUploadText: {
    fontSize: getSize(18),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  scrollContent: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 100,
  },
  removeImage: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
