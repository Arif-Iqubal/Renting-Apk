import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';

import { useRouter } from 'expo-router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale } from 'react-native-size-matters';
import Fontisto from '@expo/vector-icons/Fontisto';
import colors from '@/assets/colors';



const ForgetPassword = () => {





    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const onAgree = () => {
        router.push("/auth/signUp")
    }


    const [email, setEmail] = useState('');


    //ResetPassword
    const changepassword = () => {

        setLoading(true);
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!

                alert("Password rest email sent")
                router.replace('/auth/signIn');
                setLoading(false);
            })
    
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                // ..
            });
    }



    return (




        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <View style={styles.loginimg}>
                    <Image source={require("@/assets/images/Password2.png")} style={styles.pasimg} resizeMode="contain" />

                </View>

            </View >
            <View style={styles.body}>
                <View style={styles.logintextbox}><Text style={styles.logintext}>Res<Text style={styles.gogreen}>e</Text>
                    t <Text style={styles.gogreen}>P</Text>asswor<Text style={styles.gogreen}>d!</Text></Text></View>
                <View style={styles.userpasbox}>


                    <View style={styles.username}>
                        <Fontisto name="email" size={24} color="black" style={styles.mailicon} />
                        <TextInput
                            style={styles.temp}
                            placeholder='Enter Email first'
                            keyboardType='email-address'
                            onChangeText={(value) => setEmail(value)}

                        />
                    </View>


                </View>
            </View>
            <View style={styles.footer}>
                <View ><TouchableOpacity disabled={loading} activeOpacity={0.8} style={styles.loginbutton}
                    onPress={changepassword}>{!loading ? <Text style={styles.loginb}>Reset Password</Text> :
                        <ActivityIndicator size={'large'} color={colors.cwhite} />
                        // <Text>Loading..</Text>
                    }</TouchableOpacity></View>

            </View>


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    main: {
        // flex : 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        // flex : 3,
        // backgroundColor : 'blue',
        height: moderateScale(250),
        justifyContent: "center",
        alignItems: 'center',
    },
    loginimg: {
        // flex : 1,
        width: moderateScale(180),
        height: moderateScale(180),
        borderRadius: moderateScale(250),


    },
    pasimg: {
        // flex : 1,
        // backgroundColor : colors.pgreen,
        width: moderateScale(180),
        height: moderateScale(180),
        borderRadius: moderateScale(200),


    },
    body: {
        // flex : 3,
        height: moderateScale(190),
        gap: 10,
        // backgroundColor : 'white',
    },

    logintextbox: {
        // flex : 2,
        //  backgroundColor : 'green',
        height: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: moderateScale(30),
        // flexDirection : 'row',
        // gap : 40


    },
    logintext: {
        // flex : 1,
        //  backgroundColor : 'green',
        //  height : moderateScale(50),
        //  justifyContent :'center',
        // width : moderateScale(50),
        fontSize: moderateScale(25),
        fontWeight: 600,
        // paddingLeft: 10


    },
    userpasbox: {
        // flex : 1,
        height : moderateScale(100),
        // backgroundColor : 'grey',
        alignItems: 'center',
        gap: 20,
        justifyContent: "space-evenly",

    },

    username: {
        // flex : 1,
        borderRadius: moderateScale(30),
        height: moderateScale(45),
        width: moderateScale(300),
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        paddingLeft: 25,
        paddingRight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        overflow: 'hidden'

    },
    password: {
        // flex : 1,
        borderRadius: moderateScale(30),
        height: moderateScale(45),
        width: moderateScale(300),
        backgroundColor: 'white',
        // borderWidth: 1,

        justifyContent: 'flex-start',
        paddingLeft: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 55,
        gap: 10

    },
    forgetpassword: {
        // flex : 1,
        // justifyContent : 'flex-start',
        alignItems: 'center'
    },
    ftextpassword: {
        // flex : 1,
        // justifyContent : 'flex-start',
        color: colors.mblack

    },


    footer: {
        // flex : 4,
        // backgroundColor : 'red',
        height: moderateScale(200),
        // justifyContent : 'space-evenly',
        gap: 15,

        alignItems: 'center',
    },


    loginbutton: {
        backgroundColor: colors.pgreen,
        borderRadius: moderateScale(30),
        // height : moderateScale(45),
        width: moderateScale(250),
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: "center"

    },
    loginb: {
        // backgroundColor : 'yellow',
        color: 'black',
        borderRadius: moderateScale(30),
        // height : moderateScale(45),
        // width : moderateScale(250),
        fontWeight: 600,
        fontSize: moderateScale(15)

    },
    congoogle: {
        borderWidth: 1,
        width: moderateScale(250),
        borderRadius: 200,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        // fontWeight : 200
        // backgroundColor : 'yellow',
    },
    cgoogletext: {
        // borderRadius : moderateScale(30),
        // height : moderateScale(45),
        // width : moderateScale(250),
        fontWeight: 600,
        fontSize: moderateScale(16)
    },
    ortextbox: {
        borderRadius: moderateScale(30),
        // height : moderateScale(45),
        width: moderateScale(250),
        // backgroundColor : 'yellow',
        justifyContent: "center",
        alignItems: 'center',
    },
    ortext: {
        borderRadius: moderateScale(30),
        // backgroundColor : 'yellow',
        textAlign: 'center',
        fontSize: moderateScale(15),
        fontWeight: 600,
    },
    signupbox: {

        borderRadius: moderateScale(30),
        height: moderateScale(45),
        width: moderateScale(250),
        // justifyContent : 'center',
        // alignItems : 'center'

        // backgroundColor : 'yellow',
    },
    signupmainbox: {

        borderRadius: moderateScale(30),
        height: moderateScale(45),
        // width : moderateScale(350),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: moderateScale(25),

        // backgroundColor : 'yellow',
    },
    signuptext: {
        fontSize: moderateScale(12),
        textAlign: "center",
        color: "grey",
    },
    signupminitext: {
        fontWeight: 700,
        fontSize: moderateScale(13),
        color: '#0000EE'
    },
    temp: {
        // fontWeight : 500,
        fontSize: moderateScale(13),
        color: 'black',
        paddingLeft: moderateScale(10),
        // backgroundColor : 'yellow',
        width: moderateScale(200)
        // textAlign : "center",

    },
    mailicon: {
        color: 'grey'
    },
    keyicon: {
        color: 'grey'
    },
    gogreen: {
        color: colors.pgreen
    }
})


export default ForgetPassword;
