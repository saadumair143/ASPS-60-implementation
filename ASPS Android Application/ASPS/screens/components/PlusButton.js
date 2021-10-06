import React from 'react';
import { TouchableOpacity, Text,View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ant from 'react-native-vector-icons/AntDesign';

export const PlusButton = ({ text, screen, params }) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'flex-end', marginRight: hp('2') }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'Lora-SemiBold', marginVertical: hp('1'), fontSize: hp('2.5'), }}>{text}</Text>
            <View>
                <Ant
                    name='pluscircleo'
                    size={hp('3')}
                    color={'#FFFFFF'}
                />
            </View>
        </TouchableOpacity>
    )
}