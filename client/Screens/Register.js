import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    if (profileImage) {
      const uriParts = profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profileImage', {
        uri: profileImage,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.post('http://192.168.29.158:8000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.message === 'User Created Successfully') {
        alert('Registration successful');
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setAddress('');
        setProfileImage(null);
        
        navigation.navigate('Login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed due to a network error. Please check your connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Text style={styles.uploadButton}>Choose Profile Picture</Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <Button title="Register" onPress={handleRegister} />

      <View style={{display: 'flex', flexDirection: 'row', alignSelf:'center', margin: 15}}>
            <Text style={{textAlign: 'center', marginRight: 10}}>Already Have an Account? 
            </Text>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Login')}>
            <Text style={{textAlign: 'center', marginRight: 10}}>Login</Text> 
            </TouchableOpacity>
           
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  uploadButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
});
