import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseconfig'
import { useRouter } from 'expo-router'
const Profile = () => {
     const router = useRouter();
    const Logout = () =>{
        signOut(auth).then(()=>{
            router.replace('../auth/signIn');

        }).catch((error) => {

        });
    }
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={Logout}><Text>Logout</Text></TouchableOpacity>
    </View>
    
  )
}

export default Profile