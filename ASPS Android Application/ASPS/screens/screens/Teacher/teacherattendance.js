import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Modal, Alert, FlatList, TextInput } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import QRCode from 'react-native-qrcode-svg';

//componenets
import { Header } from '../../components/Header';
import { ScreenButton } from '../../components/ScreenButton';
import { CustomActivityIndicator } from '../../components/ActivityIndicator';
import { LargeButton } from '../../components/LargeButton';
import { Button } from '../../components/Button';

var QR = require('qrcode')
export default function TeacherQrCode({ navigation, route }) {
    const [qrData, setQrData] = useState();
    const [userSubjects, setUserSubjects] = useState([])
    const [user, setUser] = useState(route.params.params.teacher);
    const [selected, setSelected] = useState();
    const [clastime, setClassTime] = useState('');
    const [toShowFor, setToShowFor] = useState('');
    const [showQr, setShowQr] = useState(false);
    const [value, setValue] = useState();
    const [time, setTime] = useState();
    useEffect(() => {
        database().ref('Subject/').once('value', (snapshot) => {
            let a = [];
            if (snapshot.val() != null) {
                snapshot.val().map(item => {
                    if (item.teacherid == user.id) {
                        a.unshift(item)
                    }
                })
                setUserSubjects(a)
                a = []
            }
        })
    }, []);
    const timeRef = useRef();
    const toShowRef = useRef();
    //generate qr code
    const generateQrCode = async () => {
        let t = new Date().getTime();
        setTime(t)
        if (clastime != '' && toShowFor != '') {
            const a = selected.id + ',' + clastime + ',' + toShowFor + ',' + t;
            setValue(a)
            setShowQr(true);
            timeRef.current.clear('')
            toShowRef.current.clear('')
            database().ref('Attendance/' + selected.id + '/' + t).set({
                subjectId: selected.id, teacher: user.id, time: t, clastime: clastime
            })
        }
    }
    const cancel = () => {
        setShowQr(false);
        setValue();
        setClassTime('');
        setToShowFor('');
        timeRef.current.clear('')
        toShowRef.current.clear('');
        if (time != undefined) {
            database().ref('Attendance/' + selected.id + '/' + time).set('');
            setTime()
        }
    }
    const done = () => {
        setShowQr(false);
        setValue();
        setClassTime('');
        setToShowFor('');
        setSelected();
        timeRef.current.clear('')
        toShowRef.current.clear('');
        setTime()
    }
    return (
        <View style={styles.container}>
            <Modal
                visible={showQr}
                style={styles.container}
            >
                <View style={{ height: hp('100'), width: wp('90'), justifyContent: 'center', alignItems: 'center' }}>
                    <QRCode
                        value={value}
                        size={hp('40')}
                        getImageOnLoad={e => { }}
                    />
                    <View style={{ flexDirection: 'row', height: hp('20'), width: wp('90'), alignItems: 'center', justifyContent: 'space-around', marginTop: hp('2') }}>
                        <LargeButton buttonStyle={styles.button} buttonText='Done' onPress={done} buttonTextStyle={styles.text} />
                        <LargeButton buttonStyle={styles.button} buttonText='Cancel' onPress={cancel} buttonTextStyle={styles.text} />
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                <Header headertitleText={'Attendance'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
            </View>
            <View style={{ flex: 8 }}>
                {
                    selected != undefined ?
                        <View style={{ marginTop: hp('2') }}>
                            <View style={{ marginHorizontal: wp('20') }}>
                                <Text style={[styles.text]}>Subject Name: {selected.name}</Text>
                                <Text style={[styles.text]}>Credit Hours: {selected.credit}</Text>
                                <TextInput ref={timeRef} placeholder='Class time in hours' onChangeText={(e) => { setClassTime(e) }} style={styles.textInput} placeholderTextColor='#FFFFFF' />
                                <TextInput ref={toShowRef} placeholder='Time until invalid in minutes' onChangeText={(e) => { setToShowFor(e) }} style={styles.textInput} placeholderTextColor='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: hp('2') }}>
                                <LargeButton buttonStyle={[styles.button, { backgroundColor: '#FFFFFF30' }]} buttonText='Generate QR' buttonTextStyle={styles.text} onPress={generateQrCode} />
                                <LargeButton buttonStyle={[styles.button, { backgroundColor: '#FFFFFF30' }]} buttonText='Cancel' buttonTextStyle={styles.text} onPress={cancel} />

                            </View>
                        </View> :
                        <FlatList
                            data={userSubjects}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item, index }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: hp('1') }}>
                                    <Button buttonStyle={[styles.button, { backgroundColor: '#FFFFFF30' }]} value={item} setValue={setSelected} buttonText={item.name} buttonTextStyle={styles.text} />
                                </View>

                            )}
                        />
                }


            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#352056', flex: 1
    },
    subView: {
        marginHorizontal: wp('5'), justifyContent: 'space-between', flexDirection: 'row', marginVertical: hp('3'),
    },
    button: {
        alignSelf: 'center', marginVertical: hp('2'), backgroundColor: '#352056', width: wp('35'), justifyContent: 'center', alignItems: 'center', paddingVertical: hp('0.5'), borderRadius: hp('5')
    }, buttonText: {
        fontFamily: 'Lora-Bold', color: '#FFFFFF', letterSpacing: wp('0.2'), fontSize: hp('2.2')
    },
    text: {
        fontFamily: 'Lora-Medium', color: '#FFFFFF', letterSpacing: wp('0.2'), fontSize: hp('2'), textAlign: 'left', marginVertical: hp('1')
    },
    textInput: {
        fontFamily: 'Lora-Regular', color: '#FFFFFF', letterSpacing: wp('0.2'), fontSize: hp('1.8'), borderBottomColor: '#FFFFFF', borderBottomWidth: wp('0.2')
    }
})