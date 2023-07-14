import { useState, createRef } from 'react';
import {
  Keyboard, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Dimensions, 
  StyleSheet, 
  Image,  
  View,
  FlatList, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import Comment from '../components/Comment';
import ArrowTop from '../assets/icons/ArrowTop';

export default function CommentsScreen() {
  const [comment, setComment] = useState('');
  const { params: { image, comments } } = useRoute();

  const commentInputRef = createRef();
  
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.commentsSection}
      keyboardVerticalOffset={headerHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
              source={image}
              style={styles.postCardImage}
          />
          <FlatList
            data={comments}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <Comment
                profilePicture={item.authorAvatar}
                comment={item.comment}
                date={item.date}
              />
            }}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.iconAndInputWrapper} automaticallyAdjustContentInsets={false}>
            <TextInput
              style={styles.postDataInputStyle}
              onChangeText={(comment) => setComment(comment)}
              placeholder="Коментувати…"
              placeholderTextColor="#BDBDBD"
              ref={commentInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[styles.buttonStyle, comment && styles.readyToPuplish]}
              activeOpacity={0.5}
              onPress={()=> alert('Something')}
            >
              <ArrowTop />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  commentsSection: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  postCardImage: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  iconAndInputWrapper: {
    paddingTop: 32,
  },
  buttonStyle: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 40,
    borderRadius: 50,
    backgroundColor: '#bdbdbd',
  },
  readyToPuplish: {
    backgroundColor: '#FF6C00',
  },
  postDataInputStyle: {
    width: Dimensions.get('window').width - 32,
    height: 50,
    paddingLeft: 16,
    paddingRight: 42,
    borderRadius: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});