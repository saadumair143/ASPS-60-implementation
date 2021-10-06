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
export default function TeacherSubject({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.teacher);
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    //upload assignment
    const [assignmentName, setAssignmentName] = useState();
    const [assignmentFile, setAssignmentFile] = useState();
    const [assignmentTime, setAssignmentTime] = useState();
    const [selected, setSelected] = useState();
    ///view assignments
    const [assignments, setAssignments] = useState();
    const [seelctedAssignment, setSelectedAssignment] = useState();

    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        database().ref('Subject').once('value', (snapshot) => {
            if (snapshot.val() != null) {
                let b = Object.values(snapshot.val()).filter(function (item) {
                    if (item.teacherid === user.id) {
                        return item
                    }
                })
                setSubjects(b);
                setLoading(false)
            }
        })
    }, [])

    const renderSubject = (item, index) => {
        return (
            <View style={{ marginHorizontal: wp('4'), marginVertical: hp('1'), backgroundColor: '#754B85', paddingVertical: hp('1.5'), alignItems: 'center', borderRadius: hp('1'), width: wp('90'), justifyContent: 'space-evenly' }}>
                <Text style={{ fontFamily: 'Lora-SemiBold', color: '#FFFFFF', fontSize: hp('3'), }}>{item.name} </Text>
                <View style={{ justifyContent: 'space-between', width: wp('70'), marginTop: hp('2'), paddingBottom: hp('1') }}>
                    <LargeButton buttonStyle={styles.button} buttonText={'Upload assignment'} buttonTextStyle={styles.buttonText} onPress={() => { setSelected(item), PickDocument() }} />
                    <LargeButton buttonStyle={styles.button} buttonText={'View assignments'} buttonTextStyle={styles.buttonText} onPress={() => { getAssignments(item) }} />
                    <LargeButton buttonStyle={styles.button} buttonText={'View attendance'} buttonTextStyle={styles.buttonText} onPress={() => { navigation.navigate('teacherviewattendance', { subject: item }) }} />
                </View>
            </View>
        )
    }
    //uploading an assingment
    //pick document
    const PickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                allowMultiSelection: false
            })
            setAssignmentFile(res)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }
    //assignment modal
    const UploadAssignment = () => {
        if (assignmentFile != undefined) {
            return (
                <View style={{ width: wp('90'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <BorderBottomInput inputStyle={{ width: wp('80') }} placeHolder='Assignment Title' SetValue={setAssignmentName} secureEntery={false} />
                    <BorderBottomInput inputStyle={{ width: wp('80') }} placeHolder='Assignment Time in days' SetValue={setAssignmentTime} secureEntery={false} />
                    <Text style={[styles.buttonText, { marginVertical: hp('1'), alignSelf: 'center', fontFamily: 'Lora-Regular' }]}>{assignmentFile[0].name}{assignmentFile[0].type} </Text>
                    <LargeButton buttonStyle={[styles.button, { width: wp('70') }]} buttonText={'Upload'} buttonTextStyle={styles.buttonText} onPress={uplaod} />
                    <LargeButton buttonStyle={[styles.button, { width: wp('70') }]} buttonText={'cancel'} buttonTextStyle={styles.buttonText} onPress={() => { setAssignmentFile(), setAssignmentName(), setAssignmentTime(), setSelected() }} />
                </View>
            )
        }
    }
    //assignment upload
    const uplaod = async () => {
        setUploading(true)
        if (assignmentName != undefined && assignmentTime != undefined) {
            const date = new Date().getTime()
            const pathToFile = assignmentFile[0].uri;
            const upTime = new Date().getTime();
            const ref = storage().ref(selected.id + '/' + assignmentName + '/' + date);
            const response = await fetch(pathToFile);
            const blob = await response.blob();
            let task = await ref.put(blob)
                .then(async (snapshot) => {
                    return snapshot
                })
            const link = await ref.getDownloadURL();
            if (task.state == 'success') {
                firebase.database().ref('Assingment/' + selected.id + '/' + assignmentName).update({
                    link: link, time: assignmentTime, name: assignmentName, uploadTime: upTime
                }).then(res => {
                    setAssignmentFile();
                    setSelected();
                    setAssignmentName();
                    setAssignmentTime()
                    setUploading(false);
                })
            } else {
                alert('No assignment uploaded yet connection');
                setAssignmentFile();
                setSelected();
                setAssignmentName();
                setAssignmentTime()
                setUploading(false);
            }
        } else {
            alert('Please fill in the details');
        }
    }
    ///get uploaded assignmetns
    const [ViewAssign, setViewAssign] = useState(false)
    const getAssignments = (s) => {
        if (s != undefined) {
            firebase.database().ref('Assingment/' + s.id + '/').once('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setAssignments(Object.values(snapshot.val()));
                    setViewAssign(true)
                } else {
                    alert('No assignment uploaded yet')
                }
            })
        } else {
            alert('No assignment uploaded yet')
        }
    }
    //assignmentlist
    const renderAssignment = ({ item, index }) => {
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
                <Text style={[styles.buttonText, { marginVertical: hp('1') }]}>Name: {item.name}</Text>
                <Text style={[styles.buttonText, { marginVertical: hp('1') }]}>Time remaining: {remainginTime} days</Text>
                <LargeButton buttonStyle={[styles.button, { width: wp('30') }]} buttonText={'View'} buttonTextStyle={styles.buttonText} onPress={() => { navigation.navigate('openPdf', { item: item }) }} />
                <LargeButton buttonStyle={[styles.button, { width: wp('30') }]} buttonText={'Done'} buttonTextStyle={styles.buttonText} onPress={() => { setAssignments(), setViewAssign(false) }} />
            </View>
        )
    }
    //assignment modal view
    const viewAssignments = () => {
        if (assignments != undefined) {
            return (
                <View>
                    <FlatList
                        data={assignments}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={renderAssignment}
                    />
                </View>
            )
        }
    }

    if (loading || uploading) {
        return (
            <View style={styles.container}>
                <CustomActivityIndicator />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Modal
                    visible={assignments != undefined && ViewAssign}
                >
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        {
                            viewAssignments()
                        }
                    </View>
                </Modal>
                <Modal
                    visible={assignmentFile != undefined}
                >
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        {
                            UploadAssignment()
                        }
                    </View>
                </Modal>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Subjects'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={{ flex: 8 }}>
                    <FlatList
                        data={subjects}
                        style={{ alignSelf: 'center', marginTop: hp('2') }}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            renderSubject(item, index)
                        )}
                    />
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
    button: {
        backgroundColor: '#FFFFFF90', paddingVertical: hp('1'), paddingHorizontal: wp('2'), borderRadius: hp('1'), marginVertical: hp('2'), justifyContent: 'center', alignItems: 'center'
    }, buttonText: {
        fontFamily: 'Lora-Bold', color: '#FFFFFF'
    }
})