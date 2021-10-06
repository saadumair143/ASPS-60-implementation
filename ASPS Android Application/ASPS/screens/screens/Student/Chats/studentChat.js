import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, LogBox, TouchableOpacity, Modal, TextInput } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import An from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//componenets
import { Header } from '../../../components/Header';
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';
import { PlusButton } from '../../../components/PlusButton';

LogBox.ignoreAllLogs(true)
export default function StudentChat({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.student);
    const [subjects, setSubjects] = useState()
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState()
    useEffect(() => {
        if (route.params.params.student.subject == undefined) {
            setSubjects([])
            setLoading(false)
        } else {
            const subjects = route.params.params.student.subject;
            firebase.database().ref('Teacher/').on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setTeacher(snapshot.val())
                }
            })
            firebase.database().ref('Chat/' + route.params.params.student.id + '/').on('value', (snapshot) => {
                if (snapshot.val() != undefined && snapshot.val() != null) {
                    setChats(Object.values(snapshot.val()))
                    setLoading(false)
                } else {
                    subjects.map(item => {
                        firebase.database().ref('Chat/' + user.id + '/' + item.teacherid + '/').set({
                            studentId: user.id,
                            teacherid: item.teacherid,
                            msgs: [],
                            subject: item.name
                        })
                        firebase.database().ref('Chat/' + item.teacherid + '/' + user.id + '/').set({
                            studentId: user.id,
                            teacherid: item.teacherid,
                            msgs: [],
                            subject: item.name
                        })
                    })
                    setLoading(false)
                }
            })
        }
    }, [])
    //render available chats
    const renderChats = (item, index) => {
        return (
            <TouchableOpacity style={[styles.subjectButton, { alignItems: 'center', paddingHorizontal: wp('4'), width: wp('82') }]} onPress={() => {navigation.navigate('studentmsgs',{chat:item,user:user}) }}>
                <Text style={[styles.text, { width: wp('40'), alignSelf: 'flex-start' }]}>{teacher[item.teacherid].name}</Text>
                <Text style={[styles.text, { width: wp('40'), alignSelf: 'flex-end' }]}>{item.subject}</Text>
            </TouchableOpacity>
        )
    }
    if (loading || teacher == undefined) {
        return (
            <View style={styles.container}>
                <CustomActivityIndicator />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Chat'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={{ flex: 8 }}>
                    <FlatList
                        data={chats}
                        style={{ marginTop: hp('2'), alignSelf: 'center' }}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => (
                            renderChats(item, index)
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