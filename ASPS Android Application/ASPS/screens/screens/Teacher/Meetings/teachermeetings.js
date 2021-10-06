import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, LogBox, TouchableOpacity, Touchable } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

//componenets
import { Header } from '../../../components/Header';
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';


LogBox.ignoreAllLogs(true)
export default function TeacherMeetings({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.teacher);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState()
    useEffect(() => {
        firebase.database().ref('Student/').once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                setStudent(snapshot.val())
            }
        })
        firebase.database().ref('Meeting/').on('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                let allmeeting = snapshot.val().map(item => {
                    if (item.teacher == user.id) {
                        return item
                    }
                })
                setMeetings(allmeeting)
                setLoading(false)
            }
        })

    }, [])
    //approve a meeting
    const approveMeetings = (item, index, status) => {
        setLoading(true)
        firebase.database().ref('Meeting/' + item.id + '/').update({ status: status }).then(res => { setLoading(false) })
    }


    //show approved
    const [approved, setApproved] = useState(true);
    const [unapproved, setUnapproved] = useState(true)
    //render unapprovedMeetings 
    const renderUApprovedMeetings = (item, index) => {
        const currentTime = new Date().getTime();
        if (item != undefined && student != undefined && item.time >= currentTime && item.status == 'pending') {
            return (
                <View style={{ marginHorizontal: wp('10'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1'), alignItems: 'center', borderRadius: hp('4'), width: wp('80'), alignItems: 'flex-start', paddingHorizontal: wp('8') }}>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Student: {student[item.student].name}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Subject: {item.subject}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2'), width: wp('60'), paddingVertical: hp('1') }}>{String(new Date(item.time)).substr(0, 24)} </Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Status: {item.status == 'approved' ? 'Approved' : 'Pending'}</Text>
                    <TouchableOpacity style={[styles.subjectButton, { width: wp('40'), alignSelf: 'center' }]} onPress={() => { approveMeetings(item, index, 'approved') }}><Text style={[styles.text]}>Approve</Text></TouchableOpacity>
                </View>
            )
        }
    }
    //approved meetings
    const renderApprovedMeeting = (item, index) => {
        const currentTime = new Date().getTime();
        if (item != undefined && student != undefined && item.time >= currentTime && item.status == 'approved') {
            return (
                <View style={{ marginHorizontal: wp('10'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1'), alignItems: 'center', borderRadius: hp('4'), width: wp('80'), alignItems: 'flex-start', paddingHorizontal: wp('8') }}>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Student: {student[item.student].name}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Subject: {item.subject}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2'), width: wp('60'), paddingVertical: hp('1') }}>{String(new Date(item.time)).substr(0, 24)} </Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Status: {item.status == 'approved' ? 'Approved' : 'Pending'}</Text>
                </View>
            )
        }
    }
    if (loading) {
        return (
            <View style={styles.container}>
                <CustomActivityIndicator />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Meetings'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={{ flex: 8 }}>
                    <View style={{ flex: 4, paddingVertical: hp('2') }}>
                        <TouchableOpacity style={[styles.subjectButton]} onPress={() => { setUnapproved(!unapproved) }}>
                            <Text style={[styles.text]}>UnApproved</Text>
                        </TouchableOpacity>
                        {
                            unapproved == true ?
                                <FlatList
                                    data={meetings}
                                    style={{ alignSelf: 'center', marginTop: hp('2') }}
                                    keyExtractor={(item, index) => String(index)}
                                    inverted
                                    renderItem={({ item, index }) => (
                                        renderUApprovedMeetings(item, index)
                                    )}
                                />
                                : null
                        }
                    </View>
                    <View style={{ flex: 4, paddingVertical: hp('2') }}>
                        <TouchableOpacity style={[styles.subjectButton]} onPress={() => { setApproved(!approved) }}>
                            <Text style={[styles.text]}>UpComing</Text>
                        </TouchableOpacity>
                        {
                            approved== true?
                                <FlatList
                                    data={meetings}
                                    style={{ alignSelf: 'center', marginTop: hp('2') }}
                                    keyExtractor={(item, index) => String(index)}
                                    inverted
                                    renderItem={({ item, index }) => (
                                        renderApprovedMeeting(item, index)
                                    )}
                                />
                                :
                                null
                        }
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
    },
    subjectButton: {
        backgroundColor: '#FFFFFF90', marginHorizontal: wp('10'), marginVertical: hp('2.5'), flexDirection: 'row', alignItems: 'center', paddingVertical: hp('1'), borderRadius: hp('4'), paddingHorizontal: wp('4'), justifyContent: 'space-around'
    },
    text: {
        fontSize: hp('2.5'), fontFamily: 'Lora-Medium'
    },
})