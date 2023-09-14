import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput , Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


export default function EditUser({navigation,route}) {

    
    //const [userData,setUserData] = useState([])


    const {userId, fetchData} = route.params;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        address: '',
      });
    //console.log(userId)
    
   useEffect(() => {

    const fetchUserData = async () => {
        try{
          const response = await axios.get(`http://192.168.29.158:8000/api/users/${userId}`)
          const user = response.data;
          setFormData({
            username: user.username,
            email: user.email,
            mobileNumber: user.mobileNumber,
            address: user.address
          })
          //console.log(userData)
        }
        catch(error)
        {
          console.log(error)
        }
      }
    fetchUserData(); 
   }, [userId])

   const handleEdit = async () => {

    try{
      await axios.put(`http://192.168.29.158:8000/api/editusers/${userId}`, formData,  {
            headers: {
                   'Content-type': 'application/json',
            }
        })
        fetchData();
            alert(" Details Updated Successfully")
            navigation.goBack();
        
    }
    catch(error){
        console.error(error)
    }
}


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
      <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
   
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
    <Text style={styles.title}>Edit Details</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={formData.username}
        onChangeText={(text) => setFormData({...formData, username: text})}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
      />
      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        value={formData.mobileNumber}
        onChangeText={(text) => setFormData({...formData, mobileNumber: text})}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={formData.address}
        onChangeText={(text) => setFormData({...formData, address: text})}
      />
    </View>
     
      <Button title="Save" onPress={handleEdit}  />

    
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
