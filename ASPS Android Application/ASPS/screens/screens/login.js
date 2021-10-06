import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
//components
import { ToggleButton } from '../components/ToggleButton';
import { BorderBottomInput } from '../components/BorderBottomInput';
import { LargeButton } from '../components/LargeButton';


//function
import { GetDataOnce } from '../functions/GetDataOnce';

export default function Login({ navigation, route }) {

    const [isTeacher, setIsTeacher] = useState(true);
    const [id, setId] = useState();
    const [password, setPassword] = useState();

    //login 
    const login = async () => {
        if (id == undefined && password == undefined) {
            alert('Please enter valid credentials')
        } else {
            auth().signInWithEmailAndPassword(id, password).then(res => {
                if (isTeacher) {
                    try {
                        firebase.database().ref('Teacher/' + res.user.uid).once('value', (snapshot) => {
                            if (snapshot.val() != undefined && snapshot.val() != null && snapshot.val().password == password) {
                                navigation.navigate('teacherdashboard', { teacher: snapshot.val() })
                            } else {
                                alert('invalid credentials')
                            }
                        })
                    } catch (err) {
                        alert(err);
                    }
                } else {
                    try {
                        firebase.database().ref('Student/' + res.user.uid).once('value', (snapshot) => {
                            if (snapshot.val() != undefined && snapshot.val() != null && snapshot.val().password == password) {
                                navigation.navigate('studentdashboard', { student: snapshot.val() })
                            } else {
                                alert('invalid credentials')
                            }
                        })
                    } catch (err) {
                        alert(err)
                    }
                }
            }).catch(err => {
                console.log(err)
                if (err.code == 'auth/user-not-found' || err.code == 'auth/wrong-password') {
                    alert('Invalid credentials no such user')
                } else if (err.code == 'auth/too-many-requests') {
                    alert('Too many requests please wait while before trying again')
                }
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontFamily: 'Lora-Bold', fontSize: hp('10'), letterSpacing: wp('0.5'), marginTop: hp('15') }}>ASPS</Text>
            </View>
            <View style={{ flex: 2 }}>
                <ToggleButton value={isTeacher} setValue={setIsTeacher} />
                <BorderBottomInput placeHolder={'User ID'} SetValue={setId} inputStyle={{ marginTop: hp('4'), borderBottomColor: '#FFFFFF90', letterSpacing: wp('0.3') }} secureEntery={false} />
                <BorderBottomInput placeHolder={'Password'} SetValue={setPassword} inputStyle={{ marginTop: hp('3.2'), borderBottomColor: '#FFFFFF50', letterSpacing: wp('0.3') }} secureEntery={true} />
                <LargeButton buttonText={'Login'} buttonStyle={{ width: wp('50'), alignSelf: 'center', marginTop: hp('4'), backgroundColor: '#FFFFFF', borderRadius: hp('5'), paddingVertical: hp('1') }} buttonTextStyle={{ alignSelf: 'center', color: '#352056', fontSize: hp('3'), }} onPress={login} />
            </View>
            <StatusBar barStyle='light-content' />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#352056', flex: 1
    }
})