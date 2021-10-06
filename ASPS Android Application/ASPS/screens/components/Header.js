import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


export const Header = ({ headertitleText, headerTitleTextStyles, headerStyles, onGoBack }) => {
    const navigaton = useNavigation()
    return (
        <SafeAreaView style={[headerStyles, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2'), alignItems: 'center' }]}>
            {
                onGoBack != undefined ?
                    <TouchableOpacity onPress={() =>{navigaton.goBack()}}>
                        <Ionicons
                            name='arrow-back'
                            size={hp('5')}
                            style={{ color: '#FFFFFF', }}
                        />
                    </TouchableOpacity>
                    :
                    <Text></Text>
            }
            <Text style={[headerTitleTextStyles, { color: '#FFFFFF', fontSize: hp('2.5'), fontFamily: 'Lora-Bold', }]}>{headertitleText}</Text>
            <Text></Text>
        </SafeAreaView>
    )
}