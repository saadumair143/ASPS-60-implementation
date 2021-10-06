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
export default function TeacherChat({ navigation, route }) {
    const [user, setUser] = useState(route.params.params.teacher);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState()
    useEffect(() => {
        firebase.database().ref('Student/').once('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != undefined) {
                setStudent(snapshot.val())
            }
        })
        firebase.database().ref('Chat/' + route.params.params.teacher.id + '/').on('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                setChats(Object.values(snapshot.val()))
                setLoading(false)
            } else {
                setLoading(false)
            }
        })
    }, [])
    //render available chats
    const renderChats = (item, index) => {

        if (student != undefined) {
            return (
                <TouchableOpacity style={[styles.subjectButton, { alignItems: 'center', paddingHorizontal: wp('4'), width: wp('82') }]} onPress={() => { navigation.navigate('teachermsgs', { chat: item, user: user }) }}>
                    <Text style={[styles.text, { width: wp('40'), alignSelf: 'flex-start' }]}>{student[item.studentId].name}</Text>
                    <Text style={[styles.text, { width: wp('40'), alignSelf: 'flex-end' }]}>{item.subject}</Text>
                </TouchableOpacity>
            )
        }
    }
    if (loading && student == undefined) {
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