import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CustomActivityIndicator = () => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="#FFFFFF90" />
            <Text style={{color:'#FFFFFF50',marginTop:hp('2'),fontSize:hp('3'),fontFamily:'Lora-SemiBold',letterSpacing:wp('0.2')}}>Loading...</Text>
        </View>
    )
}