import { useEffect, useContext, useState } from "react";
import { router, SplashScreen, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ToastAndroid } from "react-native";
import { onAuthStateChanged , signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseconfig";
import { userDetailContext } from "../context/userDetailContext";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import colors from "@/assets/colors";

export default function Index() {

  const [loading,setLoading] = useState(true);

  const { userDetail, setUserDetail } = useContext(userDetailContext);
  const router = useRouter(); // Define the router correctly
  
  // useEffect(() => {
  //   setLoading(true)
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       await user.reload();
  //       if (user.emailVerified){
  //       console.log(user);
  //       try {
  //         const result = await getDoc(doc(db, "users", user?.email));
  //         if (result.exists()) {
  //           setUserDetail(result.data());
  //           setLoading(false)
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //         setLoading(false)
  //       }
  //       setLoading(false)
  //       router.replace("/(tabs)/home"); // Prevent multiple navigations
  //     }
  //     else {
  //       await signOut(auth);  // 🚀 Force sign-out if not verified
  //       router.replace('/auth/signIn');
  //     }
    
  //   }
  //     else setLoading(false)
  //   });

  //   return () => unsubscribe(); // Cleanup listener on unmount
  // }, []); // Runs only on mount



  // useEffect(() => {
  //   setLoading(true);
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (!user) {
  //       setLoading(false);
  //       router.replace('/auth/signIn'); // 🚀 Redirect if no user is logged in
  //       return;
  //     }
  
  //     await user.reload(); // 🔄 Refresh user data before checking
  
  //     if (!user.emailVerified) {
  //       ToastAndroid.show('Please verify your email before logging in.', ToastAndroid.LONG);
  //       await signOut(auth); // 🚀 Force sign-out if email not verified
  //       router.replace('/auth/signIn'); 
  //       return;
  //     }
  
  //     // ✅ Fetch user details only for verified users
  //     try {
  //       const result = await getDoc(doc(db, "users", user.email));
  //       if (result.exists()) {
  //         setUserDetail(result.data());
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  
  //     setLoading(false);
  //     router.replace("/(tabs)/home"); // ✅ Only verified users go to home
  //   });
  
  //   return () => unsubscribe(); // Cleanup listener
  // }, []);
  





  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        console.log("not a user");
        // router.replace('/auth/signIn'); // 🚀 Redirect to sign-in if no user
        // router.replace('/index'); // 🚀 Redirect to sign-in if no user
        return;
      }
  
      await user.reload(); // 🔄 Refresh user data
  console.log(user.email);
      if (!user.emailVerified) {
        ToastAndroid.show('Please verify your email before logging in.', ToastAndroid.LONG);
        await signOut(auth); // 🚀 Sign out if email not verified
        router.replace('/auth/signIn');
        return;
      }
  
      // ✅ Ensure Firestore document exists
      try {
        const userRef = doc(db, "users", user.email);
        const result = await getDoc(userRef);
        console.log("Checking Firestore for user:", user.email); // Debugging
        console.log("Checking Firestore for user:", result); // Debugging

        if (!result.exists()) {
          setUserDetail(result.data());
          setLoading(false);
          router.replace("/(tabs)/home"); // ✅ Navigate only when user data exists
        } else {
          console.log("⚠ No user data found in Firestore");
          ToastAndroid.show("No user data found, please contact support.", ToastAndroid.LONG);
          setLoading(false);
          await signOut(auth); // 🚀 Sign out if no Firestore data found
          router.replace('/auth/signIn');
        }
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        setLoading(false);
        await signOut(auth); // Sign out in case of error
        router.replace('/auth/signIn');
      }
    });
  
    return () => unsubscribe();
  }, []);
  





  const onAgree = () => {
    router.push("/onboard1");
  };

  return (
    <SafeAreaView style={styles.container}>
      {! loading ?
     <><View style={styles.body}>
        <Image source={require("@/assets/images/Welcome.png")} style={styles.welcome} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.welcomeText}>
          Find your perfect room in minutes – comfort, convenience, and affordability all in one place!
        </Text>
        <TouchableOpacity onPress={onAgree} activeOpacity={0.8} style={styles.head}>
          <Text style={styles.clicktext}>Next</Text>
        </TouchableOpacity>
      </View></> : <View style={styles.splash}>
        {/* <ActivityIndicator size={'large'} 
      color= {colors.cwhite} 
    
      // color={colors.pgreen}
      /> */}
      <Text style={styles.splashtext}>RentKar</Text>
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pgreen,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  body: {},
  footer: {
    height: moderateScale(200),
    width: moderateScale(300),
    gap: verticalScale(100),
  },
  welcome: {
    height: scale(300),
    width: scale(300),
    borderRadius: moderateScale(200),
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
  },
  welcomeText: {
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "poppinsLI",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },
  clicktext: {
    paddingHorizontal: 10,
    color: "#fcfffc",
    fontWeight: "600",
    fontSize: moderateScale(20),
  },
  head: {
    backgroundColor: "#2d3a3a",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(30),
  },
  splash: {
    // backgroundColor: "#2d3a3a",
    flex :1,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  splashtext: {
    // backgroundColor: "#2d3a3a",
    fontSize : moderateScale(40),
    // alignItems: 'center',
    // justifyContent: 'center'
    color: 'white',
    fontWeight: 700,
    // fontFamily : 
    
  },
});
