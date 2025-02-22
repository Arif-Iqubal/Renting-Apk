import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseconfig'
import { useRouter } from 'expo-router'
import { moderateScale } from 'react-native-size-matters'
import colors from '../../assets/colors'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
// import { ImageBackground } from 'react-native-web'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// const [imageData,setImageData] = useState(null);
const Profile = () => {

  const changepassword = () => {
    // firebase.sendPasswordResetEmail(email)
    // .then(() => {
    //   alert("Password rest email sent")

    // }).catch((error) => {
    //   alert(error)
    // })
    router.push("/auth/forgetpassword")
  }
  const router = useRouter();
  const Logout = () => {
    signOut(auth).then(() => {
      router.replace('../auth/signIn');

    }).catch((error) => {

    });
  }
  return (
    <View style={styles.main}>
      <View style={styles.profileimgcontmain}>
        <ImageBackground source={require('../../assets/images/profilebg1.png')} style={styles.bg}>
          <View style={styles.profileimgcont}>
            {/* <View style={styles.circleborder}></View> */}
            <View style={styles.profileimgin} >
              <Image style={styles.profileimg} resizeMode="contain" source={require('../../assets/images/Avatar/man.png')} />
            </View>

            <TouchableOpacity activeOpacity={0.5} style={styles.profileimgcam}><FontAwesome name="pencil-square-o" size={21} color={colors.cwhite} /></ TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <FontAwesome5 name="user" size={24} color="black" />
              <Text style={styles.logouttext}>User Name</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.nexticon}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <Fontisto name="email" size={24} color="black" />
              <Text style={styles.logouttext}>Email Id</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.nexticon}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <FontAwesome6 name="lock" size={24} color="black" />
              <Text style={styles.logouttext}>Change Password</Text>
            </View>
            <TouchableOpacity onPress={changepassword} activeOpacity={0.5} style={styles.nexticon}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <FontAwesome5 name="list" size={24} color="black" />
              <Text style={styles.logouttext}>My List</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.nexticon}>
              <AntDesign name="rightcircle" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <MaterialIcons name="favorite-border" size={24} color="black" />
              <Text style={styles.logouttext}>Favourite</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.nexticon}>
              <AntDesign name="rightcircle" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        {/* <View style={styles.profilecont} > <View style={styles.pcont} ><Text style={styles.logouttext}>Email</Text></View></View>
        <View style={styles.profilecont} > <TouchableOpacity style={styles.pcont} ><Text style={styles.logouttext}>My List</Text></TouchableOpacity></View>
        <View style={styles.profilecont} > <TouchableOpacity style={styles.pcont} ><Text style={styles.logouttext}>Favourite</Text></TouchableOpacity></View> */}
      </View>
      <View style={styles.footer}>
        <View style={styles.logoutcontmain} > <TouchableOpacity style={styles.logoutcont} onPress={Logout}><FontAwesome6 name="power-off" size={24} color="red" /></TouchableOpacity></View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: colors.pgreen,
  },
  body: {

    // gap: 10,
    backgroundColor: colors.cwhite,
    
    height: moderateScale(310),
    justifyContent: 'space-evenly'
  },
  footer: {
    height: "100%",

    backgroundColor: colors.cwhite,
    paddingTop: 20,
  },
  profileimgcontmain: {
    width: "100%",
    height: moderateScale(250),
    justifyContent: 'center',
    alignItems: "center",
    
    // backgroundColor: "red",


    // borderRadius : moderateScale(50),

  },
  profileimgcont: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: colors.pgreenl,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',



    // zIndex : 2,



  },
  profileimg: {
    width: moderateScale(120),
    height: moderateScale(120),
    backgroundColor: colors.pgreenl,
    borderRadius: moderateScale(60),
    zIndex: 2,
    borderWidth: 3,
    borderColor: colors.cwhite,



  },
  profileimgcam: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(10),
    position: 'absolute',
    // alignContent : "baseline",
    justifyContent: 'center',
    alignItems: "center",
    zIndex: 2,
    backgroundColor: colors.mblack,
    borderWidth: 2,
    borderColor: colors.cwhite,
    // marginLeft: 100,
    // marginLeft : 10,


  },
  // circleborder:{
  //   position: 'absolute',
  //   width: moderateScale(125),
  //   height: moderateScale(125),
  //   borderRadius : moderateScale(70),
  //   backgroundColor : colors.cwhite,
  //   zIndex : 1,
  // },
  logoutcontmain: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor : "red",



  },
  profilecont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor : colors.cwhite,




  },
  logoutcont: {
    width: moderateScale(220),
    height: moderateScale(50),
    borderColor: colors.mblack,
    // backgroundColor: colors.pgreenl,
    color: colors.cwhite,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,

  },
  pcont: {
    width: moderateScale(300),
    height: moderateScale(55),
    borderColor: colors.pgreen,
    // borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: colors.cwhite,

  },
  logouttext: {
    color: colors.mblack,
    fontWeight: 580,
    fontSize: moderateScale(15),


  },
  icontext: {
    flexDirection: 'row',
    gap: 20,


  },
  nexticon: {



  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center",
    // borderBottomLeftRadius : moderateScale(50),
  }

});

export default Profile