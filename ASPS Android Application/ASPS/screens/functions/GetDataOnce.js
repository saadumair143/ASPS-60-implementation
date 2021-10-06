import React from 'react';
import database, { firebase } from '@react-native-firebase/database';

export async function GetDataOnce (reference) {
    let data ;
   await database().ref(reference).once('value', (snapshot) => {
        if(snapshot.val() != undefined && snapshot.val() != null){
            data = snapshot.val()
        }else{
            data = 'no user'
        }
    })
    return data;
}



