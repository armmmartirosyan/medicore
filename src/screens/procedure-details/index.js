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
} from '@fortawesome/free-solid-svg-icons';
import {HeadText} from '@components';
import {withSafeArea} from '@hoc';
import {COLORS, FONTS, ACTIVE_BTN_OPACITY} from '@constants';

function ProcedureDetailsComponent({route}) {
  const {procedure} = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = image => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderImage = ({item}) => (
    <TouchableOpacity
      onPress={() => openImageModal(item)}
      activeOpacity={ACTIVE_BTN_OPACITY}>
      <Image source={item} style={styles.procedureImage} />
    </TouchableOpacity>
  );

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
        <HeadText>{procedure.procedure.name}</HeadText>
        <View />
      </View>

      <View style={styles.rowBetween}>
        <View style={styles.infoRow}>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size={18}
            color={COLORS.PROFOUND_BLACK}
          />
          <Text style={styles.infoText}>{procedure.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faMoneyBillAlt} size={18} color="#10B981" />
          <Text style={styles.infoText}>{procedure.procedure.price} AMD</Text>
        </View>
      </View>

      <View style={styles.doctorRow}>
        <FontAwesomeIcon
          icon={faUserMd}
          size={18}
          color={COLORS.PRIMARY_BLUE}
        />
        <Text style={styles.infoText}>{procedure.doctor.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Procedure Images</Text>
        <FlatList
          data={procedure.procedure.images}
          renderItem={renderImage}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assigned Medicines</Text>
        {procedure.medicines.length > 0 ? (
          procedure.medicines.map(medicine => (
            <View key={medicine.id} style={styles.medicineCard}>
              <FontAwesomeIcon
                size={16}
                icon={faCapsules}
                color={COLORS.PRIMARY_BLUE}
              />
              <Text style={styles.medicineText}>{medicine.name}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No medicines assigned</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notesText}>
          {procedure.notes || 'No notes provided'}
        </Text>
      </View>

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
            <Image source={selectedImage} style={styles.modalImage} />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});

export const ProcedureDetails = withSafeArea(ProcedureDetailsComponent);
