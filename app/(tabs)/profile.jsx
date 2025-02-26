import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseconfig'
import { useRouter } from 'expo-router'
import { moderateScale } from 'react-native-size-matters'
import colors from '../../assets/colors'
import Feather from '@expo/vector-icons/Feather';
// import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { db } from "../../config/firebaseconfig"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import placeholder from '../../assets/images/Avatar/man1.png'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import { Modal } from 'react-native-web';
// import { ImageBackground } from 'react-native-web'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// const placeholder = "2f3027dd-d09a-41b8-8f3e-4e33750be0ec.jpeg";
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

  // const UserProfile = ({ userId }) => {
  // const [user, setUser] = useState(null);

  const [image, setImage] = useState();
  const [modelvisible, setModalVisible] = useState();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Store user ID separately

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid); // Store user ID
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!userId) return; // Wait until userId is available

  //     try {
  //       const userRef = doc(db, "users", userId);
  //       const userSnap = await getDoc(userRef);

  //       if (userSnap.exists()) {
  //         setUser(userSnap.data()); // ✅ Set user data properly
  //       } else {
  //         console.log("No such user!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, [userId]); // Depend on userId, not user

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
          if (userData.profileImage) {
            setImage(userData.profileImage);  // Set profile image if available
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);



  // Upload Image

  const uploadImage = async (mode) => {
    try {
      let result = {}; 
      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          // mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.canceled) {
          //
          await saveImage(result.assets[0].uri);
        }
      }
      else {
        await ImagePicker.requestCameraPermissionsAsync();
         result = await ImagePicker.
          launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,


          });
        if (!result.canceled) {
          //
          await saveImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      alert("Error uploading image : " + error.message);
      setOpenModal(false);
    }

  };
  const saveImage = async (image) => {
    try {
      console.log(image)
      setImage(image);
      setOpenModal(false);
    } catch (error) {
      throw error;
    }
  };


  // Remove Image
   const removeImage = async () =>{
    try {
      setImage(null);
      setOpenModal(false);
    } catch ({message}) {
      alert(message);
      setOpenModal(false);
      
    }
   }


  // const uploadImage = async () => {
  //   try {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     let result = await ImagePicker.launchCameraAsync({
  //       cameraType: ImagePicker.CameraType.front,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       const imageUri = result.assets[0].uri;
  //       await saveImage(imageUri); // Upload Image
  //     }
  //   } catch (error) {
  //     alert("Error uploading image : " + error.message);
  //     setOpenModal(false);
  //   }
  // };

  // const saveImage = async (imageUri) => {
  //   try {
  //     if (!userId) return; // Ensure user is logged in

  //     const storage = getStorage();
  //     const storageRef = ref(storage, `profileImages/${userId}.jpg`); // Define path

  //     const response = await fetch(imageUri);
  //     const blob = await response.blob(); // Convert image to blob

  //     await uploadBytes(storageRef, blob); // Upload image to Firebase Storage

  //     const downloadURL = await getDownloadURL(storageRef); // Get image URL

  //     // Save URL in Firestore
  //     const userRef = doc(db, "users", userId);
  //     await updateDoc(userRef, { profileImage: downloadURL });

  //     setImage(downloadURL); // Update UI
  //     setOpenModal(false);
  //   } catch (error) {
  //     console.error("Error saving image: ", error);
  //   }
  // };

  const [openModal, setOpenModal] = useState(false);
  const transparent = 'rgba(0,0,0,0.2)';

  function renderModel() {
    return (
      <Modal visible={openModal} animationType="fade" transparent={true}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: transparent,
        }}>
          <View style={{
            // flex : 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: moderateScale(150),
            width: moderateScale(300),
            backgroundColor: colors.cwhite,
            borderRadius: 20,
          }} >
            <View
              style={{
                // backgroundColor: 'green',
                width: "100%",
                height: moderateScale(80),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity activeOpacity={0.5} onPress={() => uploadImage()}
                style={{
                  backgroundColor: colors.pgreenl,
                  width: moderateScale(60),
                  height: moderateScale(60),
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}
              >
                <SimpleLineIcons name="camera" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() => uploadImage('gallery')}
                style={{
                  backgroundColor: colors.pgreenl,
                  width: moderateScale(60),
                  height: moderateScale(60),
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}
              >
                <AntDesign name="picture" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() => removeImage()}
                style={{
                  backgroundColor: colors.pgreenl,
                  width: moderateScale(60),
                  height: moderateScale(60),
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}
              >
                <AntDesign name="delete" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >Remove</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setOpenModal(false)}>
              <Text
              style={{
                width: moderateScale(80),
                // height: moderateScale(30),
                // backgroundColor : 'blue',
                textAlign: 'center',
                fontSize: moderateScale(15),
                color: 'grey'
                // alignContent : 'center'
              }}
            >Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  return (
    <SafeAreaView style={styles.main}>

      <View style={styles.profileimgcontmain}>
        <ImageBackground source={require('../../assets/images/profilebg1.png')} style={styles.bg}>
          <View style={styles.profileimgcont}>
            <View style={styles.profileimgin} >
              <Image style={styles.profileimg} resizeMode="contain" source={image ? { uri: image } : placeholder} />
            </View>

            <TouchableOpacity onPress={() => setOpenModal(true)} activeOpacity={0.5} style={styles.profileimgcam}><FontAwesome name="camera" size={18} color={colors.cwhite} /></ TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <FontAwesome5 name="user" size={24} color="black" />

              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/usericon1.png')} /> */}
              <Text style={styles.logouttext}> {user?.name ? String(user.name) : "Name"}</Text>
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
              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/emailicon.png')} /> */}
              <Text style={styles.logouttext}> {user?.email ? String(user.email) : "Email"}</Text>
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

              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/lockicon.png')} /> */}
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
              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/listicon.png')} /> */}
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
              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/hearticon.png')} /> */}
              <Text style={styles.logouttext}>Favourite</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.nexticon}>
              <AntDesign name="rightcircle" size={24} color="black" />
            </TouchableOpacity >
          </View>
        </View>
        <View style={styles.profilecont} >
          <View style={styles.pcont} >
            <View style={styles.icontext}>
              <AntDesign name="infocirlce" size={24} color="black" />
              {/* <Image style={styles.iconuser} resizeMode="contain" source={require('../../assets/images/hearticon.png')} /> */}
              <Text style={styles.logouttext}>About</Text>
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
        <View style={styles.logoutcontmain} > <TouchableOpacity activeOpacity={0.5} style={styles.logoutcont} onPress={Logout}>
          {/* <FontAwesome6 name="power-off" size={32} color="white" /> */}
          <Text style={styles.logtext} >Logout</Text>
        </TouchableOpacity></View>
      </View>
      {/* <UploadModal/> */}
      {
        renderModel()
      }
    </SafeAreaView>

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

    height: moderateScale(320),
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
    alignItems: 'center',



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
    // backgroundColor: "#FF3131",//red color code
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
    width: moderateScale(195),
    color: colors.mblack,
    fontWeight: 600,
    fontSize: moderateScale(15),
    // backgroundColor : "blue",
    // fontFamily: "poppins",


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
  },
  iconuser: {
    width: moderateScale(27),
    height: moderateScale(27),
    // borderBottomLeftRadius : moderateScale(50),
  }

});

export default Profile