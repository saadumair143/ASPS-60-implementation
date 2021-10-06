import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//3rd party libs
import Pdf from 'react-native-pdf';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';


//custom components
import { CustomActivityIndicator } from '../../../components/ActivityIndicator';


export default function OpenPdf({ navigation, route }) {
    const [source, setSource] = useState();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setSource(route.params.item)
    }, [])
    //save this file
    const { config, fs } = RNFetchBlob;
    const downloadAssignment = () => {
        const date = new Date()
        if (source != undefined && source != null) {
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.DownloadDir // this is the pictures directory. You can check the available directories in the wiki.
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: false,
                    path: PictureDir + '/Assignment_'+source.name, // this is the path where your downloaded file will live in
                    description: 'Downloading image.'
                }
            }
            config(options).fetch('GET', source.link).then((res) => {
                // do some magic here
            })
        } else {
            alert('Assignment not available')
        }
    }

    if (loading && source == undefined) {
        return (
            <View style={styles.container}>
                <CustomActivityIndicator />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} >
                    <TouchableOpacity style={[styles.button]} onPress={()=>{navigation.goBack(),setSource()}}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={downloadAssignment}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
                <Pdf
                    source={{ uri: source.link }}
                    onLoadComplete={() => { setLoading(false) }}
                    enablePaging={true}
                    style={{ width: wp('99'), height: hp('90'), alignSelf: 'center' }}
                />
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
        backgroundColor: '#FFFFFF90', width: wp('30'), paddingVertical: hp('1'), paddingHorizontal: wp('2'), borderRadius: hp('1'), marginVertical: hp('2'), justifyContent: 'center', alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Lora-Bold', color: '#FFFFFF'
    }
})