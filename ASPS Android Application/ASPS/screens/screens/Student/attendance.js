import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Modal, Alert } from 'react-native';

//third party library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api-beta'

//componenets
import { Header } from '../../components/Header';
import { ScreenButton } from '../../components/ScreenButton';
import { CustomActivityIndicator } from '../../components/ActivityIndicator';
import { request } from 'react-native-permissions';


var currentImage = new FaceImage();


export default function StudentQrCode({ navigation, route }) {
    const [qrData, setQrData] = useState();
    const [user, setUser] = useState(route.params.params.student);
    const [similarity, setSimilarity] = useState('0')
    const [livenesss, setLiveNess] = useState('null')
    async function getUserFace(arr) {
        FaceSDK.presentFaceCaptureActivity(result => {
            if (result == undefined) {
                alert('Please let us detect your face for facial attendance')
            } else {
                setImage(FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.IMAGE_TYPE_LIVE).then(res => {
                    matchFaces(user.faceData, currentImage, arr);
                })
            }
            return
        }, e => { })
    }
    async function setImage(base64, type) {
        currentImage.bitmap = base64
        currentImage.imageType = type
        return;
    }
    function matchFaces(image1, image2, arr) {
        if (image1 == null || image1.bitmap == null || image1.bitmap == "" || image2 == null || image2.bitmap == null || image2.bitmap == "") {
            return
        } else {
            var request = new MatchFacesRequest()
            request.images = [image1, image2]
            FaceSDK.matchFaces(JSON.stringify(request), response => {
                response = MatchFacesResponse.fromJson(JSON.parse(response))
                let matchedFaces = response.matchedFaces;
                if ((matchedFaces[0].similarity * 100).toFixed(2) > 95 && arr != undefined) {
                    let time = new Date().getTime();
                    database().ref('Attendance/' + arr[0] + '/' + arr[3] + '/present/' + user.id).update({
                        time: time, similarity: (matchedFaces[0].similarity * 100).toFixed(2), studentId: user.id
                    }).then(res => {
                        alert("Attendance marked");
                    })

                } else {
                    alert('Please try again face similarity too low')
                }
                setSimilarity((matchedFaces.length > 0 ? ((matchedFaces[0].similarity * 100).toFixed(2) + "%") : "error"))
            }, e => { })
        }
    }
    async function liveness(arr) {
        FaceSDK.startLiveness(async (result) => {
            let response = await LivenessResponse.fromJson(JSON.parse(result));
            if (response['liveness'] == '0') {
                setLiveNess('Liveleness: ok');
                getUserFace(arr)
            } else {
                alert('Please make sure you are live');
                setQrData();
                setLiveNess('0')
            }
        }, e => { })
    }
    const onSuccess = (e) => {
        // const a = selected.id + ',' + clastime + ',' + toShowFor + ',' + time;
        let arr = e.data.split(',');
        setQrData(arr);
        let a = false;
        let b = user.subject.map(function (item) {
            if (item.id == arr[0]) {
                a = true;
                return
            }
        });
        let isValid = (arr[2] * 60 * 1000) >= (new Date().getTime() - arr[3])
        if (a && isValid) {
            liveness(arr)
        } else {
            alert('Invalid Qr Code')
        }
    }
    const QRModal = () => {
        return (
            <View style={[styles.container]}>
                <View style={{flex:1}}>
                    <TouchableOpacity style={[styles.subjectButton]} onPress={()=>{navigation.goBack()}}>
                        <Text style={[styles.text]}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:9}}>
                    <QRCodeScanner
                        onRead={(e) => { onSuccess(e) }}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        
                        topContent={
                            <Text style={[styles.text,{color:'#FFFFFF'}]}>Attendance QR code Scanner</Text>
                        }
                        topViewStyle={{paddingHorizontal:wp('2'),marginBottom:hp('4')}}
                        bottomViewStyle={{marginTop:hp('4')}}
                        bottomContent={
                            <TouchableOpacity>
                                <Text style={[styles.text,{color:'#FFFFFF'}]}>Please scan the qr code provided</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={qrData == undefined}
            >
                {
                    QRModal()
                }
            </Modal>
            <View style={{ flex: 1, backgroundColor: '#201034', justifyContent: 'center' }}>
                <Header headertitleText={'Attendance'} headerTitleTextStyles={{ marginRight: wp('8') }} onGoBack={!undefined} />
            </View>
            <View style={{ flex: 8 }}>
                <Text>{similarity}</Text>
                <Text>{livenesss}</Text>
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
    subjectButton: {
        backgroundColor: '#FFFFFF90', marginHorizontal: wp('2'), marginVertical: hp('2'), flexDirection: 'row', alignItems: 'center', paddingVertical: hp('1'), borderRadius: hp('4'), paddingHorizontal: wp('4'), justifyContent: 'space-around'
    },
    text: {
        fontSize: hp('2.5'), fontFamily: 'Lora-Medium'
    }

})