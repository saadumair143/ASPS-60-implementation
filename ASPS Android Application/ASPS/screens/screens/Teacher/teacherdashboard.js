import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';

import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import EN from 'react-native-vector-icons/Entypo';
import Fo from 'react-native-vector-icons/Fontisto';
import An from 'react-native-vector-icons/AntDesign';
//componenets
import { Header } from '../../components/Header';
import { ScreenButton } from '../../components/ScreenButton';
import { CustomActivityIndicator } from '../../components/ActivityIndicator';
export default function TeacherDashboard({ navigation, route }) {
    const [user, setUser] = useState()
    useEffect(() => {
        setUser(route.params);
    }, [])
    if (user == undefined) {
        return (
            <View style={styles.container}>
                <CustomActivityIndicator />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1.1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Dashboard'} headerTitleTextStyles={{ marginRight: wp('0') }} />
                </View>
                <View style={{ flex: 8 }}>
                    <View style={styles.subView}>

                    </View>
                    <View style={styles.subView}>
                        <ScreenButton text='Attendance' Icon={<Mc name='qrcode-scan' size={hp('4')} color={'#FFFFFF'} />} screenName={'teacherqrcode'} params={user} />
                        <ScreenButton text='Subjects' Icon={<Mc name='google-classroom' size={hp('4')} color={'#FFFFFF'} />} screenName={'teachersubjects'} params={user} />
                    </View>
                    <View style={styles.subView}>
                        <ScreenButton text='Chat' Icon={<EN name='chat' size={hp('4')} color={'#FFFFFF'} />} screenName={'teacherchat'} params={user} />
                        <ScreenButton text='Meeting' Icon={<Fo name='meetup' size={hp('4')} color={'#FFFFFF'} />} screenName={'teachermeeting'} params={user}   />
                    </View>
                    <View style={styles.subView}>
                        <ScreenButton text='Profile' Icon={<An name='profile' size={hp('4')} color={'#FFFFFF'} />} screenName={'teacherprofile'} params={user} />
                        <ScreenButton text='Logout' Icon={<An name='logout' size={hp('4')} color={'#FFFFFF'} />} screenName={'login'} />
                    </View>
                </View>
                <StatusBar barStyle='light-content' />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#352056', flex: 1
    },
    subView: {
        marginHorizontal: wp('5'), justifyContent: 'space-between', flexDirection: 'row', marginVertical: hp('3'),
    }
})