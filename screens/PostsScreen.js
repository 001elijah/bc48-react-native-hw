import { useEffect, useLayoutEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Dimensions, StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';


import placeholderAvatarSource from '../assets/images/avatar-placeholder.png';
import testImage1 from '../assets/images/11.png';
import testImage2 from '../assets/images/12.png';
import testImage3 from '../assets/images/13.png';
import LogOutButton from '../assets/icons/LogOutButton';
import PostCard from '../components/PostCard';

const testPosts = [
    {   
        id: 1,
        imageFile: testImage1,
        caption: 'Ліс',
        comments: [
            {
                id: 1,
                authorAvatar: placeholderAvatarSource,
                comment: 'comment'
            },
            {
                id: 1,
                authorAvatar: placeholderAvatarSource,
                comment: 'comment'
            }
        ]
    },
    {
        id: 2,
        imageFile: testImage2,
        caption: 'Захід на Чорному морі',
        comments: []
    },
    {
        id: 3,
        imageFile: testImage3,
        caption: 'Старий будиночок у Венеції',
        comments: [{
            id: 1,
            authorAvatar: placeholderAvatarSource,
            comment: 'comment'
        }]
    },
]

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
            <View style={styles.profileSection}>
                <Profile avatar={currentUserAvatar} userName={currentUserName} email={currentUserEmail} handleLogOut={handleLogOut}/>
            </View>
            <View style={styles.postsSection}>
                <FlatList
                    data={testPosts}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        if (index !== testPosts.length - 1) {
                            return <PostCard
                                imageFile={item.imageFile} 
                                caption={item.caption} 
                                comments={item.comments}
                            />
                        } else {
                            return <PostCard 
                                imageFile={item.imageFile}
                                caption={item.caption}
                                comments={item.comments}
                                style={styles.lastPostItem}
                            />
                        }
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    profileSection: {
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    postsSection: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 88 - 92 - 83,
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    lastPostItem: {
        flex: 1,
        gap: 8,
        paddingBottom: 43,
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