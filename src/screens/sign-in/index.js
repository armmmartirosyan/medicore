import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {InputWrapperView} from '@components';
import {SignInButton} from './components';
import {useFieldValues} from './hooks';

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {email, password, disableSignIn, setEmail, setPassword} =
    useFieldValues();

  return (
    <InputWrapperView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>SIGN IN</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#a1a1a1"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#a1a1a1"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SignInButton
        email={email}
        password={password}
        disableSignIn={disableSignIn}
      />

      <Text style={styles.footerText}>
        <Text style={styles.registerLink}>Create a new account</Text>
        {" if you don't have one."}
      </Text>
    </InputWrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  registerLink: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
