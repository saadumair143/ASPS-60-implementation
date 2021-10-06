import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const LargeButton =({buttonText,buttonStyle,buttonTextStyle,onPress})=>{
    return(
        <TouchableOpacity style={[buttonStyle,{}]} onPress={onPress} >
            <Text style={[buttonTextStyle,{fontFamily:'Lora-Bold'}]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}