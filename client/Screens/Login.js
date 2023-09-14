import { View, Text,StyleSheet, StatusBar, Platform, Image, Dimensions, TextInput, Pressable, TouchableOpacity, Button} from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {KeyboardAvoidingView} from 'react-native';


export default function Login({navigation}) {

  const [email,setEmail] = useState('admin@gmail.com')
  const [password,setPassword] = useState('admin')

  const handleLogin = async () => {
    try{
      const response = await axios.post('http://192.168.29.158:8000/api/login',{
        email,
        password,
      } )

      if(response.status === 200 && response.data.token){
        const decodeToken = jwtDecode(response.data.token)
        console.log(decodeToken)
        const userId = decodeToken.id
        if(decodeToken.role===0){
          navigation.navigate('UserDashboard', {userId})
        }
        else{
          navigation.navigate('AdminDashboard', {userId})
        }
      }
      else{
        alert('Invalid Credentials')
      }
    }
    catch(error){
      console.error('Error', error)
      alert('Login failed due to axios or network')
    }
  }



  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    style={styles.container}>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp',
        }}
      />
      <Text style={styles.text}>Sign In Here 🚀</Text>
      <View style={{display: 'flex', alignItems:'right', margin: 15, width: 300}}>
        <Text style={{fontSize: 15, margin: 5}}>Email: </Text>
        <TextInput placeholder='Enter your Email Address' style={{ 
             backgroundColor: 'grey', 
             justifyContent:'center', padding: 10, 
             borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
             }}
             value={email}
             onChangeText={(text) => setEmail(text)}
             
             />
        <Text style={{fontSize: 15, margin: 5}}>Password: </Text>
        <TextInput placeholder='Enter Your Password' 
          secureTextEntry={true} style={{ 
             backgroundColor: 'grey', 
             justifyContent:'center', 
             padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
             }}

             value={password}
             onChangeText={(text) => setPassword(text)}
             
             />
            <TouchableOpacity style={{}}>
                <Text style={{ color: 'white', 
                textAlign: 'center', 
                justifyContent: 'center',
                marginTop: 15, 
                marginLeft: 100, 
                fontSize: 25, 
                backgroundColor: 'black' , 
                width: 100,
                padding: 8,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,        
                }}
                
                 onPress={handleLogin} >Login</Text>
            </TouchableOpacity>

      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignSelf:'center'}}>
            <Text style={{textAlign: 'center', marginRight: 10}}>Doesnt Have an Account? 
            </Text>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Register')}>
            <Text style={{textAlign: 'center', marginRight: 10}}>Register</Text> 
            </TouchableOpacity>
           
            </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
     //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    
    },
    tinyLogo: {
        height: 350,
        width: 350,
    },
    text: {
        fontSize: 30,
        borderWidth: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#61DBFB',
        margin: 10,
        padding: 8,
        textAlign: 'center'
    }

  });
  