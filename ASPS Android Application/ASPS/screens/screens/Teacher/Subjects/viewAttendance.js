import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, LogBox, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';


//componenets
import { Header } from '../../../components/Header';
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';
import { LargeButton } from '../../../components/LargeButton';
import { BorderBottomInput } from '../../../components/BorderBottomInput';


LogBox.ignoreAllLogs(true)
export default function TeacherViewAttendance({ navigation, route }) {
    const [subject, setSubject] = useState()
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState();
    const [attendance, setAttendance] = useState()
    useEffect(() => {
        firebase.database().ref('Student/').once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                let students = Object.values(snapshot.val()).map(item => {
                    let isMember = item.subject.map(sub => {
                        if (sub.id == route.params.subject.id) {
                            return true
                        }
                    })
                    if (isMember) {
                        return { name: item.name, id: item.id }
                    }
                    
                })
                setStudent(students)
            }
        }).then(res => {
            firebase.database().ref('Attendance/' + route.params.subject.id + '/').once('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {

                    let st = Object.values(snapshot.val()).map(item => {
                        if (item != undefined && item != '') {
                            const object = new Object()
                            object['time'] = item.time;
                            object['present'] = Object.keys(item.present)
                            return object;
                        }
                    })
                    setAttendance(st);
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
        })
    }, [])
    //const renderSingleAttendance
    const renderSingleAttendance = (item, index, list) => {
        if (student != undefined && attendance != undefined) {
            if (list.includes(item.id)) {
                return (
                    <View style={[styles.boxView]}>
                        <Text style={styles.text}>Present</Text>
                    </View>
                )
            } else {
                return (
                    <View style={[styles.boxView]}>
                        <Text style={styles.text}>Absent</Text>
                    </View>
                )
            }
        }
    }
    //render attendance
    const renderAttendance = (att, ind) => {
        if (att != undefined && student != undefined && attendance != undefined) {
            const date = new Date(att.time)
            const d = date.toString().substr(4, 12)
            return (
                <View style={{ marginHorizontal: wp('1'), }}>
                    <Text style={[styles.heading]}>{d}</Text>
                    <FlatList
                        data={student}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            renderSingleAttendance(item, index, att.present)
                        )}
                    />
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
                <TouchableOpacity style={[styles.button, { width: wp('40'), alignSelf: 'center' }]} onPress={() => { navigation.goBack() }}>
                    <Text style={[styles.buttonText]}>Done</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: hp('2'), marginHorizontal: hp('2'), }}>

                    <View style={{}}>
                        <Text style={[styles.heading]}>Name</Text>
                        <FlatList
                            data={student}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                <View style={[styles.boxView]}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginLeft: hp('2'), paddingRight: wp('5') }}>
                        <FlatList
                            data={attendance}
                            inverted
                            horizontal
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                renderAttendance(item, index)
                            )}
                        />
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#29405C', flex: 1
    },
    subView: {
        marginHorizontal: wp('5'), justifyContent: 'space-between', flexDirection: 'row', marginVertical: hp('3'),
    },
    button: {
        backgroundColor: '#FFFFFF90', paddingVertical: hp('1'), paddingHorizontal: wp('2'), borderRadius: hp('1'), marginVertical: hp('2'), justifyContent: 'center', alignItems: 'center'
    }, buttonText: {
        fontFamily: 'Lora-Bold', color: '#FFFFFF'
    },
    heading: {
        fontSize: hp('2.5'), color: '#FFFFFF', fontFamily: 'Lora-SemiBold', textAlign: 'center'
    },
    text: {
        fontSize: hp('1.8'), color: '#FFFFFF', fontFamily: 'Lora-Regular', textAlign: 'center'
    },
    boxView: {
        marginVertical: hp('1'), borderWidth: wp('0.1'), borderColor: '#FFFFFF', padding: wp('1.5'),
    }
})