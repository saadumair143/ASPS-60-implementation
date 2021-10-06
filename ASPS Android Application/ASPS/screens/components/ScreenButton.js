import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ScreenButton = ({ text, screenName, Icon,params }) => {
    const navigaton = useNavigation()
    return (
        <TouchableOpacity style={[{ alignItems: 'center', backgroundColor: '#FFFFFF60',width:wp('40'),paddingVertical:hp('2'),borderRadius:hp('2') }]} onPress={() => { navigaton.navigate(screenName,{params:params}) }} >
            {Icon}
            <Text style={{ fontSize: hp('2.5'),textAlign:'center', fontFamily: 'Lora-Bold', color: '#FFFFFF',marginTop:hp('1') }}>{text}</Text>
        </TouchableOpacity>
    )
}