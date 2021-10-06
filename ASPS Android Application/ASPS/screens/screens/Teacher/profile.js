import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, TextInput, Modal } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';

//components
import { Header } from '../../components/Header';
import { CustomActivityIndicator } from '../../components/ActivityIndicator';

export default function TeacherProfile({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [passwordPlaceHolder, setPasswordPlaceHolder] = useState('')
    useEffect(() => {
        const id = route.params.params.teacher.id
        firebase.database().ref('Teacher/' + id).on('value', (snapshot) => {
            setUser(snapshot.val());
            setLoading(false);
            console.log(snapshot.val())
        })
    }, []);


    const [toChange, setToChange] = useState();
    const [value, setValue] = useState();
    const [passin, setPassin] = useState()
    //on cancle
    const onCancle = () => {
        setToChange();
        setValue();
        setPassin()
    }
    //re authenticate
    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    //const change user email
    const changeEmail = () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(value) && passin == user.password) {
            setLoading(true)
            reauthenticate(passin).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(value).then(() => {
                    firebase.database().ref('Teacher/' + user.uid).update({ email: value })
                    onCancle();
                    setLoading(false)
                }).catch((error) => {
                    setLoading(false)
                    alert('Email already in use');
                });
            })
        } else {
            alert('Please enter valid values')
        }
    }
    //change password
    const changePassword = () => {
        if (value != undefined && value.length >= 6 && passin == user.password) {
            setLoading(true)
            reauthenticate(passin).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(value).then(() => {
                    firebase.database().ref('Teacher/' + user.uid).update({ password: value })
                    onCancle();
                    setLoading(false)
                }).catch((error) => { alert('Password is not valid.') });
            }).catch((error) => { });
        } else {
            alert('Please enter valid credentials')
        }
    }
    //const pickImage
    const pickImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setValue(res)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }
    //upload the picture
    const uploadUserProfilePicture = async () => {
        setLoading(true)
        const ref = storage().ref('Profile/Teacher/' + user.id);
        var uri = value[0].uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        let d = await ref.put(blob)
            .then(async (snapshot) => {
                return
            })
        let downloadLink = await ref.getDownloadURL();
        firebase.database().ref('Teacher/' + user.id).update({ profilePicture: downloadLink }).then(() => {
            onCancle();
            setLoading(false)
        })
    }
    const toChangeModal = () => {
        if (toChange == 'email') {
            return (
                <View style={styles.modalView}>
                    <TextInput style={styles.text} onChangeText={(e) => { setValue(e) }} placeholder={'new email'} placeholderTextColor={'#FFFFFF90'} />
                    <TextInput style={styles.text} onChangeText={(e) => { setPassin(e) }} placeholder={'current password'} placeholderTextColor={'#FFFFFF90'} />
                    <View style={[styles.editView, { marginTop: hp('5') }]}>
                        <TouchableOpacity style={[styles.button]} onPress={changeEmail} ><Text style={styles.buttonText}>update</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={onCancle}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
            )
        } else if (toChange == 'password') {
            return (
                <View style={styles.modalView}>
                    <TextInput style={styles.text} onChangeText={(e) => { setValue(e) }} placeholder={'new password'} placeholderTextColor={'#FFFFFF90'} />
                    <TextInput style={styles.text} onChangeText={(e) => { setPassin(e) }} placeholder={'current password'} placeholderTextColor={'#FFFFFF90'} />
                    <View style={[styles.editView, { marginTop: hp('5') }]}>
                        <TouchableOpacity style={[styles.button]} onPress={changePassword}><Text style={styles.buttonText}>update</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={onCancle}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
            )
        } else if (toChange == 'profilePicture') {
            return (
                <View style={[styles.modalView]}>
                    {
                        value != undefined ?
                            <Image
                                source={{ uri: value[0].uri }}
                                style={styles.userImage}
                            /> :
                            <View style={[styles.userImage, { backgroundColor: '#FFFFFF70', justifyContent: 'center' }]}>
                            </View>
                    }
                    <TouchableOpacity style={styles.button} onPress={pickImage}><Text style={styles.buttonText}>Select</Text></TouchableOpacity>
                    <View style={[styles.editView, { marginTop: hp('5') }]}>
                        <TouchableOpacity style={[styles.button]} onPress={uploadUserProfilePicture} ><Text style={styles.buttonText}>update</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={onCancle}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                    </View>
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
                    visible={toChange != undefined}
                >
                    <View style={{ flex: 1, backgroundColor: '#00000030', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            toChangeModal()
                        }
                    </View>
                </Modal>

                <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                    <Header headertitleText={'Profile'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
                </View>
                <View style={{ flex: 8 }}>
                    <TouchableOpacity onPress={() => { setToChange('profilePicture') }} >
                        {
                            user.profilePicture != undefined ?
                                <Image
                                    source={{ uri: user.profilePicture }}
                                    style={[styles.userImage,{borderWidth:wp('5'),alignSelf:'center'}]}
                                />
                                
                                :
                                <View style={[styles.userImage, { backgroundColor: '#FFFFFF70', justifyContent: 'center' }]}>
                                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontWeight: '600', fontFamily: 'Lora-Bold' }}>No Photo</Text>
                                </View>
                        }
                    </TouchableOpacity>
                    <View style={[styles.editView]}>
                        <TextInput placeholder={user.name} style={[styles.text]} placeholderTextColor={'#FFFFFF'} editable={false} />
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                    <View style={[styles.editView]}>
                        <TextInput placeholder={user.qualification} style={[styles.text]} placeholderTextColor={'#FFFFFF'} editable={false} />
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                    <View style={[styles.editView]}>
                        <TextInput placeholder={user.email} style={[styles.text]} placeholderTextColor={'#FFFFFF'} editable={false} />
                        <TouchableOpacity style={styles.button} onPress={() => { setToChange('email') }}  ><Text style={styles.buttonText}> Change</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.editView]}>
                        <TextInput placeholder={'*******'} style={[styles.text]} placeholderTextColor={'#FFFFFF'} editable={false} />
                        <TouchableOpacity style={styles.button} onPress={() => { setToChange('password') }} ><Text style={styles.buttonText}> Change</Text></TouchableOpacity>
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
    userImage: {
        width: wp('30'), height: wp('30'), borderRadius: hp('12'), alignSelf: 'center', marginVertical: hp('2.5')
    },
    editView: {
        marginHorizontal: wp('4'), marginVertical: hp('2.5'), alignItems: 'center', flexDirection: 'row',
    },
    text: {
        color: '#FFFFFF', borderBottomColor: '#FFFFFF', borderBottomWidth: wp('0.2'), fontFamily: 'Lora-Bold', letterSpacing: wp('0.2'), width: wp('60'), fontSize: hp('2.1')
    },
    button: {
        borderWidth: wp('0.2'), borderColor: '#FFFFFF', width: wp('25'), paddingVertical: hp('1'), marginLeft: wp('4'), borderRadius: hp('5'), backgroundColor: '#FFFFFF30'
    },
    buttonText: {
        color: '#FFFFFF', fontFamily: 'Lora-SemiBold', fontSize: hp('1.8'), alignSelf: 'center',
    },
    modalView: {
        backgroundColor: '#0B0D0E', paddingVertical: hp('1.5'), paddingHorizontal: wp('2'), marginHorizontal: wp('2'), width: wp('95'), alignItems: 'center', borderRadius: hp('5')
    }
})
