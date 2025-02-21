import { Stack, Tabs } from 'expo-router';
import { ScreenStack } from 'react-native-screens';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function Layout() {
  return (
   <Tabs screenOptions={{headerShown:false}}>
    <Tabs.Screen name='home' options={{tabBarIcon : ()=> <Entypo name="home" size={24} color="black" />}}/>
    <Tabs.Screen name='add' options={{tabBarIcon : ()=> <Feather name="plus" size={24} color="black" />}}/>
    <Tabs.Screen name='profile' options={{tabBarIcon : ()=> <Feather name="user" size={24} color="black" />}}/>
   </Tabs>
  );
}
