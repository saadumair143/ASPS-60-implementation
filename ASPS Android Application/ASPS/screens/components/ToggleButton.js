import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//3rd party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//component
import { RoundButton } from './RoundButton';
export const ToggleButton = ({ value, setValue, }) => {
    return (
        <View style={{ backgroundColor: '#B8A4C7', paddingVertical: hp('0.2'), marginHorizontal: wp('4'), borderRadius: hp('8') }}>
            {
                value ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <RoundButton text='Teacher' value={value} setValue={setValue} buttonStyle={{ backgroundColor: '#2D1B4B' }} />
                        <RoundButton text='Student' value={value} setValue={setValue} buttonStyle={{ backgroundColor: '#B8A4C7' }} />

                    </View> :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <RoundButton text='Teacher' value={value} setValue={setValue} buttonStyle={{ backgroundColor: '#B8A4C7' }} />
                        <RoundButton text='Student' value={value} setValue={setValue} buttonStyle={{ backgroundColor: '#2D1B4B' }} />
                    </View>
            }
        </View>
    )
}

