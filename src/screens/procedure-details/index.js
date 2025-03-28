import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {
  faCalendarAlt,
  faMoneyBillAlt,
  faUserMd,
  faCapsules,
  faAngleLeft,
  faTimes,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {HeadText, AddMedicine} from '@components';
import {withSafeArea} from '@hoc';
import {COLORS, FONTS, ACTIVE_BTN_OPACITY, API_BASE_URL} from '@constants';
import moment from 'moment';
import {
  useDeleteVisitProcedure,
  useGetVisitProcedureById,
  useVisitProcedureUploadImages,
  useDeleteVisitProcedureImage,
  useDeleteMedicine,
} from '@api-hooks';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {launchImageLibrary} from 'react-native-image-picker';
import {useQueryClient} from 'react-query';
import {useAuthToken} from '@hooks';

function ProcedureDetailsComponent({route}) {
  const {onSuccess, id} = route.params;
  const {isDoctor} = useAuthToken();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addMedicineVisible, setAddMedicineVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {data: proc} = useGetVisitProcedureById({id});
  const procedure = proc?.data || {};

  const openImageModal = image => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const openAddMedicineModal = () => {
    setAddMedicineVisible(true);
  };

  const closeAddMedicineModal = () => {
    setAddMedicineVisible(false);
  };

  const renderImage = ({item}) => (
    <TouchableOpacity
      onPress={() => openImageModal(item)}
      activeOpacity={ACTIVE_BTN_OPACITY}>
      <Image
        source={{uri: `${API_BASE_URL}images/${item.url}`}}
        style={styles.procedureImage}
      />
    </TouchableOpacity>
  );

  const {mutate: deleteVisitProcedure} = useDeleteVisitProcedure({
    onSuccess: () => {
      onSuccess();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The procedure deleted successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to delete the procedure.',
      });
    },
  });

  const {mutate: deleteMedicine} = useDeleteMedicine({
    onSuccess: () => {
      queryClient.invalidateQueries(['get-visit-procedure-by-id']);
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The medicine deleted successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to delete the medicine.',
      });
    },
  });

  const {mutate: deleteImage} = useDeleteVisitProcedureImage({
    onSuccess: () => {
      queryClient.invalidateQueries(['get-visit-procedure-by-id']);
      closeImageModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The procedure image deleted successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to delete image.',
      });
    },
  });

  const {mutate: uploadImages} = useVisitProcedureUploadImages({
    onSuccess: () => {
      queryClient.invalidateQueries(['get-visit-procedure-by-id']);
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to upload image.',
      });
    },
  });

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];

        uploadImages({
          images: [image],
          visitProcedureId: procedure?.id,
        });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>{procedure?.procedure?.name}</HeadText>
        <View />
      </View>

      <View style={styles.rowBetween}>
        <View style={styles.infoRow}>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size={18}
            color={COLORS.PROFOUND_BLACK}
          />
          <Text style={styles.infoText}>
            {moment(procedure?.visit?.startScheduledDate).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faMoneyBillAlt} size={18} color="#10B981" />
          <Text style={styles.infoText}>{procedure?.procedure?.price} AMD</Text>
        </View>
      </View>

      {procedure?.doctor?.name && (
        <View style={styles.doctorRow}>
          <FontAwesomeIcon
            icon={faUserMd}
            size={18}
            color={COLORS.PRIMARY_BLUE}
          />
          <Text style={styles.infoText}>{procedure?.doctor?.name}</Text>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.imagesTitleUpload}>
          <Text style={{...styles.sectionTitle, marginBottom: 0}}>
            Procedure Images
          </Text>
          {isDoctor && (
            <TouchableOpacity
              activeOpacity={ACTIVE_BTN_OPACITY}
              onPress={selectImage}>
              <FontAwesomeIcon
                icon={faUpload}
                size={15}
                color={COLORS.PRIMARY_BLUE}
              />
            </TouchableOpacity>
          )}
        </View>
        {procedure?.procedureImages?.length > 0 ? (
          <FlatList
            data={procedure?.procedureImages}
            renderItem={renderImage}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyText}>No images for this procedure</Text>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.imagesTitleUpload}>
          <Text style={{...styles.sectionTitle, marginBottom: 0}}>
            Assigned Medicines
          </Text>
          {isDoctor && (
            <TouchableOpacity
              activeOpacity={ACTIVE_BTN_OPACITY}
              onPress={openAddMedicineModal}>
              <FontAwesomeIcon
                icon={faPlus}
                size={15}
                color={COLORS.PRIMARY_BLUE}
              />
            </TouchableOpacity>
          )}
        </View>
        {procedure?.medicinesAssigneds?.length > 0 ? (
          procedure?.medicinesAssigneds?.map(medicine => (
            <View key={medicine.id} style={styles.medicineCard}>
              <View key={medicine.id} style={styles.medicineCardLeft}>
                <FontAwesomeIcon
                  size={16}
                  icon={faCapsules}
                  color={COLORS.PRIMARY_BLUE}
                />
                <Text style={styles.medicineText}>{medicine.name}</Text>
              </View>
              {isDoctor && (
                <TouchableOpacity
                  activeOpacity={ACTIVE_BTN_OPACITY}
                  onPress={() => deleteMedicine(medicine.id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size={15}
                    color={COLORS.RED}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No medicines assigned</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notesText}>
          {procedure?.notes || 'No notes provided'}
        </Text>
      </View>

      {isDoctor && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={() => deleteVisitProcedure(procedure?.id)}
            style={{...styles.action, backgroundColor: COLORS.RED}}>
            <FontAwesomeIcon icon={faTrash} color="white" size={15} />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
            activeOpacity={ACTIVE_BTN_OPACITY}>
            <FontAwesomeIcon icon={faTimes} size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{uri: `${API_BASE_URL}images/${selectedImage.url}`}}
              style={styles.modalImage}
            />
          )}
          {isDoctor && (
            <TouchableOpacity
              activeOpacity={ACTIVE_BTN_OPACITY}
              onPress={() => deleteImage(selectedImage.url)}
              style={styles.deleteImage}>
              <FontAwesomeIcon icon={faTrash} color="white" size={15} />
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {addMedicineVisible && (
        <AddMedicine
          modalVisible={addMedicineVisible}
          closeModal={closeAddMedicineModal}
          visitProcedure={procedure}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
  },
  section: {
    marginVertical: 16,
  },
  imagesTitleUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginRight: 15,
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 18,
    marginBottom: 8,
  },
  procedureImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  medicineCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteImage: {
    position: 'absolute',
    bottom: '30%',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.RED,
  },
  medicineText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
  },
  notesText: {
    fontSize: 16,
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalImage: {
    width: '90%',
    height: '60%',
    borderRadius: 16,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 25,
    marginInline: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 10,
    left: 16,
  },
  action: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.LIGHT,
    color: 'white',
  },
  deleteAction: {
    width: 'auto',
  },
});

export const ProcedureDetails = withSafeArea(ProcedureDetailsComponent);
