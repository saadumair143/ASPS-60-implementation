import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Button =({buttonText,buttonStyle,buttonTextStyle,setValue,value})=>{
    return(
        <TouchableOpacity style={[buttonStyle,{}]} onPress={()=>{setValue(value)}} >
            <Text style={[buttonTextStyle,]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}