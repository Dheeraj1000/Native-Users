import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Platform, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Modals = ({navigation, route}) => {
  //const [modalVisible, setModalVisible] = useState(false);

  const {username,email,mobileNumber,address,profileImage} = route.params
  
  return (
  

    <View style={styles.centeredView}>
       
      <Modal
        animationType="slide"
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{display:'flex', flexDirection: 'row', margin: 10, padding: 10, alignSelf: 'left', justifyContent:'center'}}>
            <Image source={{uri : `http://192.168.29.158:8000/uploads/${profileImage}?${Date.now()}`}} style={{height:90, width: 75, marginTop: 18}}/>
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>Username: {username}</Text> 
            <Text style={{fontSize: 18}}>Email: {email}</Text> 
            <Text style={{fontSize: 18}}>Mobile: {mobileNumber}</Text> 
            <Text style={{fontSize: 18}}>Address: {address}</Text> 
            </View>
            </View>
           
            </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center'}} >
            <Ionicons name="arrow-back-circle" size={40} color="black" />
            <Text>Back </Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default Modals;