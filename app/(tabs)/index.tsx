import { Text, View, StyleSheet } from 'react-native';
// import { Link } from 'expo-router';
// import { Image } from 'expo-image';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import { ImageSource } from 'expo-image';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | null>(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ['images'],
        })

        if (!result.canceled) {
            {
                /* The result will be an object like this (on the web):
                {
                    "assets": [
                    {
                        "fileName": "some-image.png",
                        "height": 720,
                        "mimeType": "image/png",
                        "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA"
                    }],
                    "canceled": false
                }
                */
            }
            console.log(result);
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You did not select any image.");
        }
    }

    const onReset = () => {
        setShowAppOptions(false);
    }

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onSaveImageAsync = async () => {

    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
            </View>

            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
                </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
