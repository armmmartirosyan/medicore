import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {FONTS, COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import {Profile as profile} from '@images';

const user = {
  name: 'John Doe',
  profilePicture: profile,
};

export function AccountHeader({showName = true, allowChangePicture}) {
  return (
    <View style={styles.profileHeader}>
      <Text style={styles.headerText}>My Profile</Text>
      <View style={styles.imageWrapper}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        {allowChangePicture && (
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={ACTIVE_BTN_OPACITY}>
            <FontAwesomeIcon color="white" icon={faPencil} size={13} />
          </TouchableOpacity>
        )}
      </View>
      {showName && <Text style={styles.userName}>{user.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 24,
    marginBottom: 12,
    color: COLORS.PRIMARY_BLUE,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    position: 'relative',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userName: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 24,
    color: 'black',
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: -1,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
