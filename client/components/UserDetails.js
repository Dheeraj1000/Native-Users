import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserDetails({ navigation,route }) {
  const { userData } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
      <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: `http://192.168.29.158:8000/uploads/${userData.profileImage}?${Date.now()}` }}
        />
        <Text style={styles.username}>Your Details: {userData.username}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{userData.email}</Text>

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.info}>{userData.mobileNumber}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}>{userData.address}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
    
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontSize: 24,
    marginTop: 10,
  },
  details: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
});
