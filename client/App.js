import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Register';
import UserDashboard from './Screens/UserDashboard';
import AdminDashboard from './Screens/AdminDashboard';
import UserDetails from './components/UserDetails';
import EditUser from './components/EditUser';
import Analysis from './components/Analysis';
import Modals from './components/Modal';

//const Stack = createNativeStackNavigator();

export default function App() {
  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="UserDashboard" component={UserDashboard}/>
          <Stack.Screen name="UserDetails" component={UserDetails}/>
          <Stack.Screen name="EditDetails" component={EditUser}/>
          <Stack.Screen name="Analysis" component={Analysis}/>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard}/>
          <Stack.Screen name="Modal" component={Modals}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
