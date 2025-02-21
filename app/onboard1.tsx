import { View, Text,StyleSheet ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { push } from 'expo-router/build/global-state/routing';
// import ButtonClick from '@/component/atom/buttonclick';


const onboard1 = () => {
  const onAgree = () => {
    router.push("/onboard2")
    // alert("alert");
    // console.warn("Clicking");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}></View> */}
      <View style={styles.body}>
        <Image source={ require("@/assets/images/city1.png")} style = {styles.welcome} resizeMode = "contain"/>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style = {styles.welcomeText}>Looking for a home away from home? Discover rooms that suit your style and budget today!</Text>
        </View>
       <TouchableOpacity onPress={onAgree} activeOpacity={0.8} style={styles.head}>
                       <Text style={styles.clicktext} >Next</Text>
                       {/* <AntDesign name="rightcircle" size={24} color="black" /> */}
                     </TouchableOpacity>
       {/* <AntDesign name="rightcircle" size={24} color="black" /> */}
        
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#fcfffc",
    alignItems : "center",
    justifyContent : "space-between",
    paddingVertical : 60,

  },
  header : {},
  body : {},
  footer : {
    height : moderateScale(200),
    width : moderateScale(300),
    gap : verticalScale(100)
    // borderColor : "black",
    // backgroundColor : "#2ba84a",
    // borderRadius : 20,
  },
  welcome : {
    height : scale(300),
    width : scale(300),
    borderRadius : moderateScale(200),
    borderColor : "#000",
    backgroundColor : "#f0f0f0",
  },
  welcomeText :{
    textAlign : "center",
    fontStyle : "italic",
    fontWeight : "600",
    fontSize : moderateScale(16)
  },
  clicktext : {
    paddingHorizontal : 10,
    color : "#fcfffc",
    fontWeight : 600,
    fontSize : moderateScale(20),
    alignContent : "center",
    justifyContent : "center",
    flexDirection : "row",

},
head : {
  backgroundColor : "#2d3a3a",
  alignContent : "center",
  justifyContent : "center",
  flexDirection : "row",
  paddingVertical: moderateScale(10),
  borderRadius: moderateScale(30),
  gap:10,
  // height : 100,
},
});
export default onboard1