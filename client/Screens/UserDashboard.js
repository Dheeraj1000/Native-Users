import { View, Text,StyleSheet, StatusBar,Platform, FlatList, Image, ScrollView, Button, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Feather } from '@expo/vector-icons'; 
import UserDetails from '../components/UserDetails';
import EditUser from '../components/EditUser';


export default function UserDashboard({navigation,route}) { 

    const [userData,setUserData] = useState([])


      const {userId} = route.params;
      
      //console.log(userId)
      const fetchData = async () => {
        try{
          const response = await axios.get(`http://192.168.29.158:8000/api/users/${userId}`)
          setUserData(response.data)
          //console.log(userData)
        }
        catch(error)
        {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchData();
      },[]);
  

    const handleLogout = async () => {
      try{
        await axios.post('http://192.168.29.158:8000/api/signout')
        navigation.navigate('Login');
      }
      catch(error){
        console.error(error)
      }
    }

    // const imageUrl =  `http://localhost:5000/uploads/${userData.profileImage}?${Date.now()}`;
    // console.log(imageUrl)

    const handleView = () => {
      navigation.navigate('UserDetails', {userData});
    }

    const userIds = userData._id;

    const handleEdit = () => {
      navigation.navigate('EditDetails', {
        userId : userData._id,
        fetchData:fetchData,
      });
    }

    const handleAnalysis = () => {
      navigation.navigate('Analysis')
    }
    
  return (
    
    <View style={styles.container}>
     
      <View style={{display: 'flex',  alignItems: 'center', }}>
        <Text style={styles.text}>User Profile</Text>
            <Image
            style={styles.tinyLogo}
            source={{
            uri: `http://192.168.29.158:8000/uploads/${userData.profileImage}?${Date.now()}`
            }}
      onError={(error) => console.log("Image load error:", error)}
      />

      </View>

      <View style={{margin: 25, justifyContent: 'center'}}>
        <Text style={styles.text}>Welcome {userData.username}!</Text>
        
      </View>
        
        <View style={{ display: 'flex',backgroundColor: '#03a1fc', width: '100%',justifyContent: 'center', height: '50%',borderRadius: 20}}>
        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
         
         <Image 
            style={{height: 100, width: 100}}
            source={{uri : 'https://cdn-icons-png.flaticon.com/512/3967/3967279.png'}}
            alt=''
            
             />
             
             <Image 
            style={{height: 106, width: 100}}
            source={{uri : 'https://cdn-icons-png.flaticon.com/512/4342/4342405.png'}}
            alt=''
             />
    
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-around', padding: 10}}>
            <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.insidetext}>Edit ✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleView}>
            <Text style={styles.insidetext}>View 👁️</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
             <Image 
            style={{height: 100, width: 100}}
            source={{uri : 'https://cdn-icons-png.flaticon.com/512/6821/6821002.png'}}
            alt=''
             />
             <Image 
            style={{height: 95, width: 95}}
            source={{uri : 'https://cdn-icons-png.flaticon.com/512/1211/1211601.png'}}
            alt=''
             />
             </View>
             <View style={{flexDirection: 'row', justifyContent:'space-around', padding: 10}}>
             <TouchableOpacity onPress={handleAnalysis}>
            <Text style={styles.insidetext} >Analysis 📈</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.insidetext} >Progress 📊</Text>
            </TouchableOpacity>
            </View>
             
        </View>

        <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    alignItems: 'center',
     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
     margin: 20,
     fontSize: 20,
     backgroundColor: '#eee'
    },
  
    text: {
      fontSize: 24,

    },
    insidetext:{
      color: 'white',
      fontSize: 18
    },
    tinyLogo: {
      height: 90,
      width: 90,
      padding: 20,
      justifyContent: 'space-between',
      marginTop: 20,
      backgroundColor: 'gray',
      borderRadius: 100
  },
  button:{
    backgroundColor:'#03a1fc',
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
    borderRadius: 20
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  }

})