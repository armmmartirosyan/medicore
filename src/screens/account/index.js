import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  faAngleRight,
  faShieldHalved,
  faArrowRightFromBracket,
  faKey,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarMinus, faUser} from '@fortawesome/free-regular-svg-icons';
import {COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import {AccountHeader} from '@components';
import {withSafeArea} from '@hoc';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '@contexts';
import {useGetProfileInfo} from '@api-hooks';
import {useAuthToken} from '@hooks';

function AccountComponent() {
  const {signOut} = useAuth();
  const {isDoctor} = useAuthToken();
  const navigation = useNavigation();

  const handleSignOut = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: signOut},
    ]);
  }, [signOut]);

  const MENU_ITEMS = useMemo(() => {
    var initial = [
      {
        label: 'Profile',
        icon: faUser,
        onPress: () => navigation.navigate('Profile'),
      },
      {
        label: 'Change Password',
        icon: faKey,
        onPress: () => navigation.navigate('ChangePassword'),
      },
      {
        label: 'Terms and Privacy',
        icon: faShieldHalved,
        onPress: () => navigation.navigate('TermsAndPrivacy'),
      },
      {
        label: 'Logout',
        icon: faArrowRightFromBracket,
        onPress: handleSignOut,
      },
    ];

    if (isDoctor) {
      initial = [
        {
          label: 'Profile',
          icon: faUser,
          onPress: () => navigation.navigate('Profile'),
        },
        {
          label: 'Week days schedule',
          icon: faCalendarDays,
          onPress: () => navigation.navigate('WeekDaysSchedule'),
        },
        {
          label: 'Non-working days',
          icon: faCalendarMinus,
          onPress: () => navigation.navigate('NonWorkingDays'),
        },
        {
          label: 'Change Password',
          icon: faKey,
          onPress: () => navigation.navigate('ChangePassword'),
        },
        {
          label: 'Terms and Privacy',
          icon: faShieldHalved,
          onPress: () => navigation.navigate('TermsAndPrivacy'),
        },
        {
          label: 'Logout',
          icon: faArrowRightFromBracket,
          onPress: handleSignOut,
        },
      ];
    }

    return initial;
  }, [isDoctor]);

  useGetProfileInfo();

  return (
    <View style={styles.container}>
      <AccountHeader />

      <ScrollView style={styles.menu}>
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={item.onPress}>
            <View style={styles.iconBackground}>
              <FontAwesomeIcon
                icon={item.icon}
                style={styles.menuIcon}
                size={20}
              />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
            <FontAwesomeIcon
              color={COLORS.PRIMARY_BLUE}
              icon={faAngleRight}
              size={20}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: COLORS.SECONDARY_BLUE,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  menuIcon: {
    color: COLORS.PRIMARY_BLUE,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  menuArrow: {
    fontSize: 16,
    color: '#888',
  },
});

export const Account = withSafeArea(AccountComponent);
