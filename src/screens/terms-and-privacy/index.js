import React from 'react';
import {View, Pressable, StyleSheet, Text, ScrollView} from 'react-native';
import {withSafeArea} from '@hoc';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {HeadText} from '@components';
import {COLORS, FONTS} from '@constants';
import {getSize} from '@utils';

function TermsAndPrivacyComponent() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>Terms & Conditions</HeadText>
        <View />
      </View>
      <Text style={styles.text}>
        Welcome to <Text style={styles.name}> MediCore</Text>. By downloading,
        accessing, or using our mobile application, you agree to be bound by the
        following Terms and Conditions. Please read them carefully before
        proceeding.
        {'\n'}
        {'\n'}1. Acceptance of Terms By using this application, you confirm that
        you have read, understood, and agree to these Terms and Conditions. If
        you do not agree, please refrain from using the application.
        {'\n'}
        {'\n'}2. Use of the Application The application is designed to assist
        users in scheduling visits, managing procedures, and accessing health
        information conveniently. You agree to use the application solely for
        its intended purposes and in compliance with applicable laws.
        {'\n'}
        {'\n'}3. User Responsibilities You are responsible for maintaining the
        confidentiality of your account credentials. You agree to provide
        accurate and up-to-date information when using the application. You will
        not use the application for any unlawful or unauthorized purposes.
        {'\n'}
        {'\n'}4. Appointments and Notifications While the application helps you
        schedule visits and set reminders, it is your responsibility to confirm
        and attend appointments. The application is not responsible for missed
        appointments or notifications.
        {'\n'}
        {'\n'}5. Medical Disclaimer The application is a tool to manage your
        dental health schedule and procedures. It does not provide medical
        advice, diagnosis, or treatment. Always consult with a licensed dental
        professional for medical concerns.
        {'\n'}
        {'\n'}6. Intellectual Property All content, trademarks, and intellectual
        property in the application belong to
        <Text style={styles.name}> MediCore</Text>. You may not use, copy, or
        distribute any part of the application without prior written consent.
        {'\n'}
        {'\n'}7. Limitation of Liability
        <Text style={styles.name}> MediCore</Text> is not responsible for any
        direct, indirect, or incidental damages resulting from the use or
        inability to use the application.
        {'\n'}
        {'\n'}8. Modifications We reserve the right to update or modify these
        Terms and Conditions at any time. Changes will be effective immediately
        upon posting.
        {'\n'}
        {'\n'}9. Termination We reserve the right to suspend or terminate your
        access to the application if you violate these Terms and Conditions.
        {'\n'}
        {'\n'}10. Contact Us If you have any questions, please contact us at
        armenmartirosyan020@gmail.com.
      </Text>

      <HeadText>Privacy Policy</HeadText>

      <Text style={styles.text}>
        Your privacy is important to us. This Privacy Policy explains how
        <Text style={styles.name}> MediCore</Text> collects, uses, and protects
        your information.
        {'\n'}
        {'\n'}1. Information We Collect We may collect the following types of
        information: Personal Information: Name, email address, phone number,
        and other details provided during registration. Health Information:
        Information about your dental visits, procedures, and health-related
        notes. Usage Data: Information about how you use the application, such
        as features accessed and time spent.
        {'\n'}
        {'\n'}2. How We Use Your Information We use the information to: Provide
        and improve the application’s functionality. Send reminders,
        notifications, and updates. Analyze usage trends to enhance the user
        experience. Comply with legal and regulatory requirements.
        {'\n'}
        {'\n'}3. Sharing of Information We do not sell or share your personal
        information with third parties, except: When required by law or legal
        processes. To protect the rights, safety, or property of
        <Text style={styles.name}> MediCore</Text> or other users. With trusted
        service providers who assist in application operations, under strict
        confidentiality agreements.
        {'\n'}
        {'\n'}4. Data Security We implement appropriate technical and
        organizational measures to protect your data from unauthorized access,
        loss, or misuse. However, no system is completely secure, and we cannot
        guarantee absolute security.
        {'\n'}
        {'\n'}5. Your Rights You have the right to: Access and update your
        personal information. Request the deletion of your data, subject to
        legal and operational requirements. Opt-out of non-essential
        notifications.
        {'\n'}
        {'\n'}6. Retention of Data We retain your information as long as
        necessary to provide the services and fulfill legal obligations. Once no
        longer required, your data will be securely deleted.
        {'\n'}
        {'\n'}7. Third-Party Services The application may integrate with
        third-party services for notifications, analytics, or other features.
        These services have their own privacy policies, and we are not
        responsible for their practices.
        {'\n'}
        {'\n'}8. Changes to This Policy We may update this Privacy Policy from
        time to time. Any changes will be posted within the application, and
        your continued use indicates acceptance.
        {'\n'}
        {'\n'}9. Contact Us If you have questions or concerns about this Privacy
        Policy, please contact us at armenmartirosyan020@gmail.com.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    color: COLORS.PRIMARY_BLUE,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getSize(20),
    paddingBottom: getSize(20),
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontFamily: FONTS.LIGHT,
    paddingVertical: 20,
  },
});

export const TermsAndPrivacy = withSafeArea(TermsAndPrivacyComponent);
