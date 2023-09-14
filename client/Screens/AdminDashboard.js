import { View, Text, StyleSheet, StatusBar, Platform, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function AdminDashboard({navigation, route}) {
  
  const [users,setUsers] = useState([])


  


  useEffect(() => {

    const fetchAllUsers = async () => {
      const response = await axios.get('http://192.168.29.158:8000/api/allusers')
      setUsers(response.data)
      //console.log(response.data)
    }
    fetchAllUsers();
  },[])

  
  const handleLogout = async () => {
    try{
      await axios.post('http://192.168.29.158:8000/api/signout')
      navigation.navigate('Login');
    }
    catch(error){
      console.error(error)
    }
  }

  const handleDelete = async (userId) => {
    try{
      await axios.delete(`http://192.168.29.158:8000/api/allusers/${userId}`)
      //console.log(userId)
      setUsers((previoususers) => previoususers.filter((user) => user._id !== userId))
    }
    catch(error){
      console.log(error)
    }
  }

  
const MyComponent = ({users}) => (
 <>
  {users.map((item,index) => (
    <View key={item._id} 
    style={{
      margin:6 , 
      padding: 5, 
      backgroundColor: '#8cc5e6', 
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
       }}>
     <Card.Title
        title={item.username}
        subtitle={item.email}
        left={() => <Image source={{uri : `http://192.168.29.158:8000/uploads/${item.profileImage}?${Date.now()}`}} 
        alt='' 
        style={{
          height: 40, 
          width: 40, 
          borderRadius: 100
        }}/>}


        right={() => (
          <View style={{display:'flex' , flexDirection: 'row'}}>
            <IconButton icon="eye" 

            onPress={() => {navigation.navigate('Modal', {
              username : item.username,
              email: item.email,
              mobileNumber: item.mobileNumber,
              profileImage: item.profileImage,
              address: item.address,
            })}} />

            <IconButton icon="delete" 
              onPress={() => handleDelete(item._id)}
            />
            </View>
        )
      }
      />
    </View>
  ))}
 </>
);


  return (
    <ScrollView>
    <View style={styles.container} horizontal>
       <Text style={styles.text}>Admin Profile</Text>
      
    </View>
    <MyComponent users={users}/>
    
  
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#eee',
    alignItems: 'center',
   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
   display: 'flex',
   margin: 20
  },
  text: {
    fontSize: 24,
  },
  button:{
    backgroundColor:'#03a1fc',
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignItems: 'center'
  }

})