import { useEffect, useLayoutEffect, useState, createRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions, StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import ArrowLeft from '../assets/icons/ArrowLeft';
import placeholderImageSource from '../assets/images/avatar-placeholder.png';
import MapPin from '../assets/icons/MapPin';
import Camera from '../assets/icons/Camera';
import Trash from '../assets/icons/Trash';

export default function CreatePostsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const titleInputRef = createRef();
  const locationInputRef = createRef();

  useLayoutEffect(() => {
    const handleGoBack = () => {
        navigation.goBack();
    }
        navigation.setOptions({
            headerLeft: () => (
                    <TouchableOpacity
                      style={styles.goBackButton}
                      activeOpacity={0.5}
                      onPress={() => handleGoBack()}>
                      <ArrowLeft />
                    </TouchableOpacity>
            ),
        })
    })
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={useHeaderHeight()}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View>
            <Image source={placeholderImageSource} style={styles.imageStyle} />
            <TouchableOpacity
                            style={styles.cameraButtonStyle}
                            activeOpacity={0.5}
                            onPress={()=> alert('something')}>
                            <Camera />
            </TouchableOpacity>
          </View>
          <Text style={styles.hintMessage}>Завантажте фото</Text>
          <TextInput
            style={[styles.postDataInputStyle, styles.titleInputWidth]}
            onChangeText={(title) => setTitle(title)}
            underlineColorAndroid="#f000"
            placeholder="Назва…"
            placeholderTextColor="#BDBDBD"
            ref={titleInputRef}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <View style={styles.iconAndInputWrapper}>
            <View style={[styles.postDataInputStyle, styles.locationInputStyle]}>
              <MapPin />
            </View>
            <TextInput
              style={[styles.postDataInputStyle, styles.locationInputStyle, styles.locationInputWidth]}
              onChangeText={(location) => setLocation(location)}
              underlineColorAndroid="#f000"
              placeholder="Місцевість…"
              placeholderTextColor="#BDBDBD"
              ref={locationInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={()=> alert('something')}>
                            <Text style={styles.buttonTextStyle}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
                            style={styles.removeButtonStyle}
                            activeOpacity={0.5}
                            onPress={()=> alert('something')}>
                            <Trash />
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  goBackButton: {
    marginLeft: 16,
  },
  imageStyle: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    paddingBottom: 8,
    borderRadius: 8,
  },
  cameraButtonStyle: {
    width: 60,
    height: 60,
    position: 'absolute',
    left: (Dimensions.get('window').width - 32) / 2 - 30,
    top: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  hintMessage: {
    paddingBottom: 32,
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
  },
  iconAndInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postDataInputStyle: {
    height: 50,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locationInputStyle: {
    justifyContent: 'center',
    paddingRight: 4,
  },
  titleInputWidth: {
    width: Dimensions.get('window').width - 32,
  },
  locationInputWidth: {
    width: Dimensions.get('window').width - 56,
  },
  buttonStyle: {
    height: 51,
    width: Dimensions.get('window').width - 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderColor: '#FF6C00',
    borderRadius: 100,
  },
  buttonTextStyle: {
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
  },
  removeButtonStyle: {
    width: 70,
    height: 40,
    marginTop: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderColor: '#FF6C00',
    borderRadius: 100,
  }
});