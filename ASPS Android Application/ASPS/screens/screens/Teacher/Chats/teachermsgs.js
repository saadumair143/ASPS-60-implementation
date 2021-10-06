import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, LogBox, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView } from 'react-native';

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

export default function TeacherMsgs({ navigation, route }) {
    const [loading, setLoading] = useState(true)
    const [msgs, setMsgs] = useState([]);
    const [number, setNumber] = useState(0)
    useEffect(() => {
        firebase.database().ref('Chat/' + route.params.chat.teacherid + '/' + route.params.chat.studentId + '/msgs/').on('value', (snapshot) => {
            if (snapshot.val() != undefined && snapshot.val() != null) {
                setMsgs(snapshot.val())
                setNumber(snapshot.val().length)
                setLoading(false)
                if (msgs.length > 2 && loading == false && flatListRef.current != null) {
                    flatListRef.current.scrollToIndex({ animated: true, index: msgs.length - 1 })
                }
            } else {
                setLoading(false)
            }
        })
    }, [])

    //msg
    const [msg, setMsg] = useState();
    //input 
    const inputRef = React.useRef();
    const flatListRef = useRef();
    //send the messege
    const sendMsg = () => {
        if (msg != undefined && msg != null) {
            firebase.database().ref('Chat/' + route.params.chat.teacherid + '/' + route.params.chat.studentId + '/msgs/' + number).set({
                sender: route.params.chat.teacherid,
                text: msg,
                time: (new Date().getTime())
            })
            firebase.database().ref('Chat/' + route.params.chat.studentId + '/' + route.params.chat.teacherid + '/msgs/' + number).set({
                sender: route.params.chat.teacherid,
                text: msg,
                time: (new Date().getTime())
            })
            inputRef.current.clear();
            inputRef.current.focus();
            if (msgs.length > 2) {
                flatListRef.current.scrollToIndex({ animated: true, index: msgs.length - 1 })
            }
            setMsg()
        } else {
            alert('Please type a messege')
        }
    }
    //get time 
    const converTime = (time) => {
        const dt = new Date(time)
        return dt
    }
    //render all the msgs
    const renderMsgs = (item, index) => {
        if (item.sender == route.params.chat.teacherid) {
            return (
                <View style={{ alignSelf: 'flex-end', marginVertical: hp('0.5'), borderRadius: hp('4'), backgroundColor: '#767676', paddingHorizontal: wp('4'), paddingVertical: hp('0.5') }}>
                    <Text style={[{ textAlign: 'right', fontSize: hp('2.5'), color: '#00000090' }]}>{item.text}</Text>
                    <Text style={[{ textAlign: 'right', color: '#FFFFFF90' }]}>{String(converTime(item.time)).substring(4, 25)}</Text>
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: 'flex-start', marginVertical: hp('0.5'), borderRadius: hp('4'), backgroundColor: '#222222', paddingHorizontal: wp('4'), paddingVertical: hp('0.5') }}>
                    <Text style={[{ textAlign: 'left', color: '#FFFFFF90' }, styles.text]}>{item.text}</Text>
                    <Text style={[{ textAlign: 'right', color: '#FFFFFF90' }]}>{String(converTime(item.time)).substring(4, 25)}</Text>
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
            <KeyboardAvoidingView style={[styles.container]}>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity style={[styles.subjectButton]} onPress={() => { navigation.goBack() }} >
                        <Text style={[styles.text]}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8, marginTop: hp('5'), marginHorizontal: wp('2') }}>
                    <FlatList
                        data={msgs}
                        keyExtractor={(item, index) => String(index)}
                        ref={flatListRef}
                        getItemLayout={(data, index) => (
                            { length: hp('2'), offset: hp('10') * index, index }
                        )}
                        renderItem={({ item, index }) => (renderMsgs(item, index))}
                    />
                </View>
                <View style={{ flex: 2.5, flexDirection: 'row', alignItems: 'center', marginHorizontal: wp('4'), marginVertical: hp('0') }}>
                    <TextInput
                        ref={inputRef}
                        placeholder={'New Messege here'}
                        onChangeText={(e) => { setMsg(e) }}
                        placeholderTextColor={'#FFFFFF90'}
                        style={{ borderWidth: wp('0.5'), paddingHorizontal: wp('4'), width: wp('60'), borderRadius: hp('4'), borderColor: '#FFFFFF80', color: '#FFFFFF' }}
                    />
                    <TouchableOpacity style={[styles.subjectButton,{width:wp('25'),marginRight:wp('2')}]} onPress={() => { sendMsg() }}>
                        <Text style={[styles.text]}>send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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