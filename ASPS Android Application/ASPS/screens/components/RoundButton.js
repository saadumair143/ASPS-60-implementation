import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const RoundButton = ({ value, setValue, text, buttonStyle,buttonTextStyle }) => {
    return (
        <TouchableOpacity onPress={() => { setValue(!value) }} style={[buttonStyle, { width: wp('45'),borderRadius:hp('5'),paddingVertical:hp('1.2'), }]}>
            <Text style={[buttonTextStyle, { fontFamily: 'Lora-Bold',textAlign:'center',fontSize:hp('2.5'),color:'#FFFFFF', }]}>{text}</Text>
        </TouchableOpacity>
    )
}