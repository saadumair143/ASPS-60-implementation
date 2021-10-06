import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
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

import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api-beta'

var img = new FaceImage()
export default function StudentDashboard({ navigation, route }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    function setImage(base64, type) {
        img.bitmap = base64
        img.imageType = type
    }
    useEffect(() => {
        setUser(route.params);
        if (route.params.student.faceData == undefined) {
            FaceSDK.presentFaceCaptureActivity(result => {
                setImage(FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.IMAGE_TYPE_LIVE);
                if (img.bitmap != undefined) {
                    database().ref('Student/' + route.params.student.id + '/').update({
                        faceData: img
                    }).then(res => {
                        navigation.navigate('login')
                    })
                } else {
                    alert('Please allow face detection for attendance')
                }
            }, e => { })
        } if (route.params.student.subject == undefined) {
            navigation.navigate('studentsubject', { params: route.params })
        } else {
            setLoading(false)
        }
    }, [])
    if (loading) {
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
                        <ScreenButton text='Attend Class' Icon={<Mc name='qrcode-scan' size={hp('4')} color={'#FFFFFF'} />} screenName={'studentqrcode'} params={user} />
                        <ScreenButton text='Subjects' Icon={<Mc name='google-classroom' size={hp('4')} color={'#FFFFFF'} />} screenName={'studentsubject'} params={user} />
                    </View>
                    <View style={styles.subView}>
                        <ScreenButton text='Chat' Icon={<EN name='chat' size={hp('4')} color={'#FFFFFF'} />} screenName={'studentchat'} params={user} />
                        <ScreenButton text='Meeting' Icon={<Fo name='meetup' size={hp('4')} color={'#FFFFFF'} />} screenName='studentmeeting' params={user} />
                    </View>
                    <View style={styles.subView}>
                        <ScreenButton text='Profile' Icon={<An name='profile' size={hp('4')} color={'#FFFFFF'} />} screenName='studentprofile' params={user} />
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