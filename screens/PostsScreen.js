import { useEffect, useLayoutEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';


import placeholderAvatarSource from '../assets/images/avatar-placeholder.png';
import LogOutButton from '../assets/icons/LogOutButton';



function Profile({ avatar, userName, email }) {
    return (
        <View style={styles.userDataWrapper}>
            <Image source={avatar ? avatar : placeholderAvatarSource} style={styles.avatar} />
            <View>
                <Text style={styles.userNameText}>{ userName }</Text>
                <Text>{ email }</Text>
            </View>
        </View>
    )
}

export default function PostsScreen({ navigation }) {

    const [currentUserName, setCurrentUserName] = useState('Natali Romanova');
    const [currentUserEmail, setCurrentUserEmail] = useState('email@example.com');
    const [currentUserAvatar, setCurrentUserAvatar] = useState(placeholderAvatarSource);

    // const { params: { avatar, userName, email } } = useRoute();

    const handleLogOut = () => {
        navigation.navigate("Auth");
    }
    
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                    <TouchableOpacity
                      style={styles.logoutButton}
                      activeOpacity={0.5}
                      onPress={() => handleLogOut()}>
                      <LogOutButton />
                    </TouchableOpacity>
            ),
            headerLeft: () => null,
        })
    })
    return (
        <>
            <View style={styles.container}>
                <Profile avatar={currentUserAvatar} userName={currentUserName} email={currentUserEmail} handleLogOut={handleLogOut}/>
            </View>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    userDataWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        width: 198,
        height: 60,
        marginTop: 32,
    },
    userNameText: {
        fontSize: 13,
        fontFamily: 'Roboto-Medium',
        fontStyle: 'normal',
        fontWeight: 700,
    },
    userEmailText: {
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
        fontStyle: 'normal',
        fontWeight: 400,
        color: 'rgba(33, 33, 33, 0.8)',
    },
    logoutButton: {
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        backgroundColor: '#f6f6f6',
    },
});