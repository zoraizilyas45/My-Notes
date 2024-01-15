import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => handleSignUp(values),
  });

  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const { email, password, username } = values;
      await auth().createUserWithEmailAndPassword(email, password);
      console.log(`User ${username} signed up successfully!`);
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    formik.handleSubmit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formSubmitted && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          value={formik.values.username}
        />
        {formSubmitted && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        {formSubmitted && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          value={formik.values.confirmPassword}
        />
        {formSubmitted && (
          <Text style={styles.errorText}>
            {formik.errors.confirmPassword}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.textStyle}>Sign up</Text>
        )}
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
        <TouchableOpacity style={styles.buttonsignin} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.textStyle}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#be8f01',
    padding: 10,
    borderRadius: 5,
    marginTop:3
  },
  buttonsignin:{
    backgroundColor: '#be8f01',
    padding: 10,
    borderRadius: 5,
    marginTop:10
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
