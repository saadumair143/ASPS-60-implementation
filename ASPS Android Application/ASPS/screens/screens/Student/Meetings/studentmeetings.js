import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, LogBox, TouchableOpacity, Modal, TextInput } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'

//componenets
import { Header } from '../../../components/Header';
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';


LogBox.ignoreAllLogs(true)
export default function StudentMeetings({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.student);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true)
    const [subjects, setSubject] = useState([]);
    const [totalMeeting, setTotalMeeting] = useState(0);
    const [teacher, setTeacher] = useState()
    useEffect(() => {
        setSubject(route.params.params.student.subject);
        firebase.database().ref('Teacher/').once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                setTeacher(snapshot.val())
            }
        })
        firebase.database().ref('Meeting/').on('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                let allMeetings = snapshot.val().map(item => {
                    if (item.student == user.id) {
                        return item
                    }
                })
                setMeetings(allMeetings)
                setTotalMeeting(snapshot.val().length)
                setLoading(false);
            } else {
                setLoading(false)
            }
        })
    }, [])

    const renderApprovedMeetings = (item, index) => {
        const currentTime = new Date().getTime();
        if (item != undefined && teacher != undefined && item.time >= currentTime && item.status=='approved') {
            return (
                <TouchableOpacity disabled={true} style={{ marginHorizontal: wp('10'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1'), alignItems: 'center', borderRadius: hp('4'), width: wp('80'), alignItems: 'flex-start', paddingHorizontal: wp('8') }}>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Teacher: {teacher[item.teacher].name}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Subject: {item.subject}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2'), width: wp('60'), paddingVertical: hp('1') }}>{String(new Date(item.time)).substr(0, 24)} </Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Status: {item.status == 'approved' ? 'Approved' : 'Pending'}</Text>
                </TouchableOpacity>
            )
        }
    }
    const renderunApprovedMeetings = (item, index) => {
        const currentTime = new Date().getTime();
        if (item != undefined && teacher != undefined && item.time >= currentTime && item.status != 'approved') {
            return (
                <TouchableOpacity disabled={true} style={{ marginHorizontal: wp('10'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1'), alignItems: 'center', borderRadius: hp('4'), width: wp('80'), alignItems: 'flex-start', paddingHorizontal: wp('8') }}>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Teacher: {teacher[item.teacher].name}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Subject: {item.subject}</Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2'), width: wp('60'), paddingVertical: hp('1') }}>{String(new Date(item.time)).substr(0, 24)} </Text>
                    <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('2.5'), width: wp('60'), paddingVertical: hp('1') }}>Status: {item.status == 'approved' ? 'Approved' : 'Pending'}</Text>
                </TouchableOpacity>
            )
        }
    }
    //selected subject for meeting
    const [selectedSubject, setSelectedSubject] = useState();
    const [ismeetinModal, setIsMeetingModal] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    //cancel the meeting
    const onCancel = () => {
        setIsMeetingModal(false)
        setOpen(false)
        setSelectedSubject();
        setDate(new Date())
    }
    const createMeeting = () => {
        firebase.database().ref('Meeting/' + totalMeeting).set({
            id: totalMeeting,
            student: user.id,
            teacher: selectedSubject.teacherid,
            time: date.getTime(),
            subject: selectedSubject.name,
            status: 'pending'
        }).then(() => { onCancel() })

    }
    const meetingModal = () => {
        if (selectedSubject == undefined) {
            return (
                <View style={styles.modalView}>
                    <FlatList
                        data={subjects}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.subjectButton} onPress={() => { setSelectedSubject(item), setOpen(true) }} >
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.modalView}>
                    {
                        open ?
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                minimumDate={new Date()}
                                mode='datetime'
                                is24hourSource={true}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={onCancel}
                            /> :
                            <View style={[{ paddingVertical: hp('3') }]}>
                                <Text style={[styles.text, { color: '#FFFFFF90', alignSelf: 'center' }]}>{String(date).substr(0, 21)}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: hp('5') }}>
                                    <TouchableOpacity style={[styles.subjectButton]} onPress={createMeeting} >
                                        <Text style={[styles.text]}>Meet</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.subjectButton]} onPress={onCancel} >
                                        <Text style={[styles.text]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
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
                <Modal
                    transparent={true}
                    visible={ismeetinModal}
                >
                    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        {
                            meetingModal()
                        }
                    </View>
                </Modal>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Meetings'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={{ flex: 8 }}>
                    <TouchableOpacity style={styles.subjectButton} onPress={() => { setIsMeetingModal(true) }} ><Text style={styles.text}>Schedule Meeting +</Text></TouchableOpacity>
                    <View style={{ flex: 2 }} >
                    <TouchableOpacity style={[styles.subjectButton]} disabled={true}>
                            <Text style={[styles.text]}>un-Approved</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={meetings}
                            style={{ alignSelf: 'center', marginTop: hp('2') }}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                renderunApprovedMeetings(item, index)
                            )}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <TouchableOpacity style={[styles.subjectButton]} disabled={true}>
                            <Text style={[styles.text]}>up-Coming</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={meetings}
                            style={{ alignSelf: 'center', marginTop: hp('2') }}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                renderApprovedMeetings(item, index)
                            )}
                        />
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
    modalView: {
        backgroundColor: '#0B0D0E', paddingVertical: hp('1.5'), paddingHorizontal: wp('2'), marginHorizontal: wp('2'), width: wp('95'), alignItems: 'center', borderRadius: hp('5')
    },
    input: {
        fontFamily: 'Lora-Regular', fontSize: hp('2.5'), color: '#FFFFFF', borderBottomWidth: wp('0.3'), borderBottomColor: '#FFFFFF', width: wp('20'), marginHorizontal: wp('2'), textAlign: 'center'
    }
})