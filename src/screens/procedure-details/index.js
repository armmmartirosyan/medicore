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
import {getSize} from '@utils';

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
            size={getSize(20)}
          />
        </Pressable>
        <HeadText>{procedure?.procedure?.name}</HeadText>
        <View />
      </View>

      <View style={styles.rowBetween}>
        <View style={styles.infoRow}>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size={getSize(18)}
            color={COLORS.PROFOUND_BLACK}
          />
          <Text style={styles.infoText}>
            {moment(procedure?.visit?.startScheduledDate).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesomeIcon
            icon={faMoneyBillAlt}
            size={getSize(18)}
            color="#10B981"
          />
          <Text style={styles.infoText}>{procedure?.procedure?.price} AMD</Text>
        </View>
      </View>

      {procedure?.doctor?.name && (
        <View style={styles.doctorRow}>
          <FontAwesomeIcon
            icon={faUserMd}
            size={getSize(18)}
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
                size={getSize(15)}
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
                size={getSize(15)}
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
                  size={getSize(16)}
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
                    size={getSize(15)}
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
            <FontAwesomeIcon icon={faTrash} color="white" size={getSize(15)} />
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
            <FontAwesomeIcon
              icon={faTimes}
              size={getSize(24)}
              color="#FFFFFF"
            />
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
              <FontAwesomeIcon
                icon={faTrash}
                color="white"
                size={getSize(15)}
              />
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
    padding: getSize(16),
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: getSize(20),
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getSize(8),
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getSize(8),
  },
  infoText: {
    marginLeft: getSize(8),
    fontSize: getSize(16),
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
  },
  section: {
    marginVertical: getSize(16),
  },
  imagesTitleUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getSize(8),
    marginRight: getSize(15),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: getSize(18),
    marginBottom: getSize(8),
  },
  procedureImage: {
    width: getSize(120),
    height: getSize(80),
    borderRadius: getSize(8),
    marginRight: getSize(8),
  },
  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: getSize(12),
    padding: getSize(12),
    marginVertical: getSize(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: getSize(2)},
    shadowRadius: getSize(4),
    elevation: getSize(2),
  },
  medicineCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteImage: {
    position: 'absolute',
    bottom: '30%',
    width: getSize(40),
    height: getSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getSize(20),
    backgroundColor: COLORS.RED,
  },
  medicineText: {
    marginLeft: getSize(8),
    fontSize: getSize(16),
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
  },
  notesText: {
    fontSize: getSize(16),
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    marginLeft: getSize(10),
  },
  emptyText: {
    fontSize: getSize(16),
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    fontStyle: 'italic',
    marginLeft: getSize(10),
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
    borderRadius: getSize(16),
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: getSize(40),
    right: getSize(20),
    zIndex: getSize(10),
  },
  actionsContainer: {
    position: 'absolute',
    bottom: getSize(25),
    marginInline: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: getSize(10),
    left: getSize(16),
  },
  action: {
    width: getSize(40),
    height: getSize(40),
    borderRadius: getSize(25),
    backgroundColor: COLORS.PRIMARY_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: getSize(10),
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: getSize(10),
    fontSize: getSize(16),
    fontFamily: FONTS.LIGHT,
    color: 'white',
  },
  deleteAction: {
    width: 'auto',
  },
});

export const ProcedureDetails = withSafeArea(ProcedureDetailsComponent);
