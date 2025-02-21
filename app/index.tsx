import { useEffect, useContext, useState } from "react";
import { router, SplashScreen, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
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
  
  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
      
        console.log(user);
        try {
          const result = await getDoc(doc(db, "users", user?.email));
          if (result.exists()) {
            setUserDetail(result.data());
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setLoading(false)
        }
        setLoading(false)
        router.replace("/(tabs)/home"); // Prevent multiple navigations
      }
      else setLoading(false)
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []); // Runs only on mount

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
