import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Modal, Alert, FlatList, ScrollView } from 'react-native';
//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';

import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import EN from 'react-native-vector-icons/Entypo';
import Fo from 'react-native-vector-icons/Fontisto';
import An from 'react-native-vector-icons/AntDesign';
//componenets
import { Header } from '../../../components/Header';
import { ScreenButton } from '../../../components/ScreenButton';
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';
import { LargeButton } from '../../../components/LargeButton';
export default function StudentSubject({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.student)
    const [subjects, setSubjects] = useState([]);
    const [noSubject, setNoSubject] = useState(true);
    const [allSubject, setAllSubject] = useState([])
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [credit, setCredits] = useState(0)
    useEffect(() => {
        firebase.database().ref('Student/' + route.params.params.student.id + '/subject').on('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != undefined) {
                setSubjects(snapshot.val());
                setNoSubject(false)
            } else {
                firebase.database().ref('Subject/').once('value', (snapshot) => {
                    let a = snapshot.val();
                    let subjects = a.map(item => {
                        if (item.teacherid != null && item.semester <= route.params.params.student.semester) {
                            return item
                        }
                    })
                    setAllSubject(subjects);
                })
            }
        })
    }, [])

    //addsubject
    const addSubject = (item) => {
        console.log(item);
        const data = allSubject.filter(a=>a != item)
        setAllSubject(data);
        let a = selectedSubject;
        a.unshift(item);
        let b = credit + parseInt(item.credit);
        setCredits(b)
        setSelectedSubject(a)
    }
    //removesubject
    const removeSubject = (item) => {
        const data = selectedSubject.filter(a => a.id != item.id)
        setSelectedSubject(data)
        let a = allSubject;
        a.unshift(item);
        setAllSubject(a)
        let b = credit - parseInt(item.credit);
        setCredits(b)

    }
    //render available subjbect
    const renderAllSubject = (item, index) => {
        if (item != undefined && item.teacherid != null) {
            return (
                <TouchableOpacity style={[styles.subjectButton]} onPress={() => { addSubject(item) }} >
                    <Text style={[styles.text]} >name: {item.name}</Text>
                    <Text style={[styles.text]} >credit: {item.credit}</Text>
                    <Text style={[styles.text]} >Add +</Text>
                </TouchableOpacity>
            )
        }
    }
    //render selected subjbect
    const renderSelectdSubject = (item, index) => {
        if (item != undefined) {
            return (
                <TouchableOpacity style={[styles.subjectButton]} onPress={() => { removeSubject(item) }} >
                    <Text style={[styles.text]} >name: {item.name}</Text>
                    <Text style={[styles.text]} >credit: {item.credit}</Text>
                    <Text style={[styles.text]} >Add +</Text>
                </TouchableOpacity>
            )
        }
    }
    //register subject 
    const registerSubject = () => {
        if (user.semester == 1) {
            if (credit == 16) {
                firebase.database().ref('Student/' + user.id).update({ subject: selectedSubject })
                navigation.navigate('login')
                setNoSubject(false);
            } else {
                alert('Please select all subjects please ')
            }
        } else {
            if (credit >= 12 && credit <= 21) {
                firebase.database().ref('Student/' + user.id).update({ subject: selectedSubject });
                navigation.navigate('login')
                setNoSubject(false)
            } else {
                alert('total credit should be bewteen or equal to 12 and 21')
            }
        }
    }
    const [assignment, setAssignment] = useState([]);
    const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)
    //assingment
    const fetchAssingmnet = (item) => {
        firebase.database().ref('Assingment/' + item.id).once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                setAssignment(Object.values(snapshot.val()));
                setAssignmentModalVisible(true)
            } else {
                alert('No assignments yet!')
            }
        })
    }
    //render assignment
    //assignmentlist
    const renderAssignment = (item, index) => {
        const rm = (new Date().getTime()) - item.uploadTime + (item.time * 24 * 60 * 60 * 1000);
        const inDays = ((rm / 1000) / 60) / 60 / 24;
        const time = Math.floor(inDays);
        let remainginTime;
        if (time >= 0) {
            remainginTime = time
        } else {
            remainginTime = 'Pass due date'
        }
        return (
            <View style={{ marginHorizontal: wp('4'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1.5'), alignItems: 'center', borderRadius: hp('1'), width: wp('90'), justifyContent: 'space-evenly' }}>
                <Text style={[styles.text, { marginVertical: hp('1') }]}>Name: {item.name}</Text>
                <Text style={[styles.text, { marginVertical: hp('1') }]}>Time remaining: {remainginTime} days</Text>
                <LargeButton buttonStyle={[styles.subjectButton, { width: wp('30') }]} buttonText={'View'} buttonTextStyle={styles.text} onPress={() => { navigation.navigate('openPdf', { item: item }) }} />
                <LargeButton buttonStyle={[styles.subjectButton, { width: wp('30') }]} buttonText={'Done'} buttonTextStyle={styles.text} onPress={() => { setAssignmentModalVisible(false), setAssignment() }} />
            </View>
        )
    }
    //the assignment modal
    const assignmentModal = () => {
        if (assignment != undefined) {
            return (
                <View style={[styles.container]}>
                    <TouchableOpacity style={[styles.subjectButton]}>
                        <Text style={[styles.text]}>Done</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={assignment}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            renderAssignment(item, index)
                        )}

                    />
                </View>
            )
        }
    }
    //render user subjects
    const renderSubjects = (item, index) => {
        return (
            <View style={[{ marginHorizontal: wp('2'), marginVertical: hp('2'), alignSelf: 'center', width: wp('90'), justifyContent: 'center', alignItems: 'center', borderWidth: wp('0.2'), borderColor: '#FFFFFF90', borderRadius: hp('2'), paddingVertical: hp('2') }]}>
                <Text style={[styles.text, { color: '#FFFFFF90', fontSize: hp('3') }]}>{item.name}</Text>
                <TouchableOpacity style={[styles.subjectButton]} onPress={() => { fetchAttendance(item) }} ><Text style={[styles.text]}>Attendance</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.subjectButton]} onPress={() => { fetchAssingmnet(item) }}><Text style={[styles.text]}>Assignments</Text></TouchableOpacity>
            </View>
        )
    }
    //subject attendance
    const [isAttendanceModal, setIsAttendanceModal] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [present, setPresents] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0)

    const fetchAttendance = (item) => {
        firebase.database().ref('Attendance/' + item.id).once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                let a = Object.values(snapshot.val())
                let x = 0;
                let y = 0;
                let attendance = a.map(item => {
                    if (item != undefined && item != '') {
                        x = x + 1
                        var date = new Date(item.time)
                        let isPresent = new Object();
                        let presents = Object.keys(item.present);
                        if (presents.includes(user.id)) {
                            y = y + 1
                            setPresents(a);
                            isPresent['present'] = 'yes'
                            isPresent['date'] = String(date).substr(4, 21)
                        } else {
                            isPresent['present'] = 'no'
                            isPresent['date'] = String(date).substr(4, 21)
                        }
                        return isPresent
                    }
                })
                setAttendance(attendance);
                setPresents(y)
                setTotalClasses(x)
                setIsAttendanceModal(true);

            } else {
                setIsAttendanceModal(true)
            }
        })
    }
    //student attendnace history attenandance
    const renderStudentAttenance = (item, index) => {
        if (item != undefined && item != null) {
            return (
                <View style={{ width: wp('90'), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', borderWidth: hp('0.1'), borderColor: '#FFFFFF90', paddingHorizontal: wp('4'), paddingVertical: hp('1') }}>
                    <Text style={[styles.text, { width: wp('55'), color: '#FFFFFF', fontSize: hp('2.5'), fontFamily: 'Lora-Semibold', paddingRight: hp('2') }]}>{item.date}</Text>
                    <Text style={[styles.text, { width: wp('35'), color: '#FFFFFF', fontSize: hp('2.5'), fontFamily: 'Lora-Regular', paddingLeft: wp('4'), paddingVertical: hp('0.4'), borderLeftWidth: wp('0.2'), borderLeftColor: '#FFFFFF60' }]}>{item.present == 'yes' ? 'Present' : 'Absent'}</Text>
                </View>
            )
        }
    }
    //const present modal
    const attModal = () => {
        return (
            <FlatList
                data={attendance}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => (
                    renderStudentAttenance(item, index)
                )}
            />
        )
    }
    if (noSubject) {
        return (
            <View style={[styles.container]}>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Subject'} headerTitleTextStyles={{ marginRight: wp('8') }} />
                </View>
                <View style={[{ flex: 8 }]}>
                    <View style={{ flex: 3, flexGrow: 5 }}>
                        <Text style={[styles.text, { alignSelf: 'center', color: '#FFFFFF', marginVertical: hp('4') }]}>Available Subjects</Text>
                        <FlatList
                            data={allSubject}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                renderAllSubject(item, index)
                            )}
                        />
                    </View>
                    <View style={{ flex: 3, flexGrow: 5 }}>
                        <Text style={[styles.text, { alignSelf: 'center', color: '#FFFFFF', marginVertical: hp('4') }]}>Selected Subjects</Text>
                        <FlatList
                            data={selectedSubject}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                renderSelectdSubject(item, index)
                            )}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <TouchableOpacity style={[styles.subjectButton]} onPress={registerSubject} ><Text>Done</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={[styles.container]}>
                <Modal
                    visible={isAttendanceModal}
                >
                    <View style={styles.container}>
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp('5'), marginVertical: hp('1') }}>
                            <TouchableOpacity onPress={() => { setAttendance([]), setIsAttendanceModal(false), setPresents(0), setTotalClasses(0) }} >
                                <Text style={styles.text, { color: '#FFFFFF', fontSize: hp('2.5'), fontFamily: 'Lora-Bold' }}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.text, { color: '#FFFFFF', fontSize: hp('2.5'), fontFamily: 'Lora-Bold' }}>Attendance</Text>
                            <Text></Text>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={[styles.text, { color: '#FFFFFF90', fontFamily: 'Lora-Regular' }]}>Total: {totalClasses}</Text>
                            <Text style={[styles.text, { color: '#FFFFFF90', fontFamily: 'Lora-Regular' }]}>Presents: {present}</Text>
                            <Text style={[styles.text, { color: '#FFFFFF90', fontFamily: 'Lora-Regular' }]}>Percent: {totalClasses == 0 ? '0' : Math.floor((present / totalClasses) * 100)}%</Text>
                        </View>
                        <View style={{ flex: 9 }}>
                            {
                                attModal()
                            }
                        </View>

                    </View>
                </Modal>
                <Modal
                    visible={assignmentModalVisible}
                >
                    {
                        assignmentModal()
                    }
                </Modal>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Subject'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={[{ flex: 8 }]}>
                    <FlatList
                        data={subjects}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            renderSubjects(item, index)
                        )}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#352056', flex: 1
    },
    subjectButton: {
        backgroundColor: '#FFFFFF90', marginHorizontal: wp('2'), marginVertical: hp('2'), flexDirection: 'row', alignItems: 'center', paddingVertical: hp('1'), borderRadius: hp('4'), paddingHorizontal: wp('4'), justifyContent: 'space-around'
    },
    text: {
        fontSize: hp('2.5'), fontFamily: 'Lora-Medium'
    }
})