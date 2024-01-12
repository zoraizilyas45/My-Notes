import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSignIn(values),
  });

  const handleSignIn = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing in:', error.message);
    } finally {
      setLoading(false);
    }
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
        {formik.touched.email && <Text style={styles.errorText}>{formik.errors.email}</Text>}
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
        {formik.touched.password && <Text style={styles.errorText}>{formik.errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.textStyle}>Sign in</Text>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInForm;

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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
