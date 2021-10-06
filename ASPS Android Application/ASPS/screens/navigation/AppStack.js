import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from '../screens/login';

//Teacher screens
import TeacherDashboard from '../screens/Teacher/teacherdashboard';
import TeacherQrCode from '../screens/Teacher/teacherattendance';
import TeacherMeetings from '../screens/Teacher/Meetings/teachermeetings';
import TeacherChat from '../screens/Teacher/Chats/teacherchat';
import TeacherSubject from '../screens/Teacher/Subjects/teachersubject';
import TeacherProfile from '../screens/Teacher/profile';
import TeacherMsgs from '../screens/Teacher/Chats/teachermsgs';
import OpenPdf from '../screens/Teacher/Subjects/pdfopen';
import TeacherViewAttendance from '../screens/Teacher/Subjects/viewAttendance';
//student screens
import StudentDashboard from '../screens/Student/studentdashboard';
import StudentChat from '../screens/Student/Chats/studentChat';
import StudentMeetings from '../screens/Student/Meetings/studentmeetings';
import StudentQrCode from '../screens/Student/attendance';
import StudentSubject from '../screens/Student/studentSubject/studentSubject';
import StudentProfile from '../screens/Student/profile';
import StudentMsgs from '../screens/Student/Chats/studentMsgs';

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Navigator>
            <Screen name='login' component={Login} options={{ headerShown: false }} />
            {/*Teacher screens*/}
            <Screen name='teacherdashboard' component={TeacherDashboard} options={{ headerShown: false }} />
            <Screen name='teacherqrcode' component={TeacherQrCode} options={{ headerShown: false }} />
            <Screen name='teacherchat' component={TeacherChat} options={{ headerShown: false }} />
            <Screen name='teachermeeting' component={TeacherMeetings} options={{ headerShown: false }} />
            <Screen name='teachersubjects' component={TeacherSubject} options={{ headerShown: false }} />
            <Screen name='teacherprofile' component={TeacherProfile} options={{ headerShown: false }} />
            <Screen name='teachermsgs' component={TeacherMsgs} options={{ headerShown: false }} />
            <Screen name='openPdf' component={OpenPdf} options={{ headerShown: false }} />
            <Screen name='teacherviewattendance' component={TeacherViewAttendance} options={{ headerShown: false }} />
            {/*Student screens*/}
            <Screen name='studentdashboard' component={StudentDashboard} options={{ headerShown: false }} />
            <Screen name='studentchat' component={StudentChat} options={{ headerShown: false }} />
            <Screen name='studentmeeting' component={StudentMeetings} options={{ headerShown: false }} />
            <Screen name='studentqrcode' component={StudentQrCode} options={{ headerShown: false }} />
            <Screen name='studentsubject' component={StudentSubject} options={{ headerShown: false }} />
            <Screen name='studentprofile' component={StudentProfile} options={{ headerShown: false }} />
            <Screen name='studentmsgs' component={StudentMsgs} options={{ headerShown: false }} />
        </Navigator>
    )
}

const AppNavigator = () => (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
)

export default AppNavigator;