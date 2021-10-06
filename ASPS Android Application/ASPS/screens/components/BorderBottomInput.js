import React from 'react';
import {  TextInput } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BorderBottomInput = ({ placeHolder, SetValue, inputStyle, secureEntery,ref }) => {
    return (
        <TextInput
            placeholder={placeHolder}
            ref={ref}
            secureTextEntry={secureEntery}
            onChangeText={(e) => { SetValue(e) }}
            placeholderTextColor={'#FFFFFF80'}
            style={[inputStyle, { borderBottomWidth: wp('0.2'), marginHorizontal: wp('10'), color: '#FFFFFF', fontFamily: 'Lora-Bold', fontSize: hp('2.5') }]}
        />
    )
}