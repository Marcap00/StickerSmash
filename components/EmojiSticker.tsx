import { View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const scaleImage = useSharedValue(imageSize);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) { // if the image is not at the max size, double the size
                scaleImage.value = scaleImage.value * 2;
            } else { // if the image is at the max size, halve the size
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        }
    });

    return (
        <View style={{ top: -350 }}>
            {/* <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} /> */}
            <GestureDetector gesture={doubleTap}>
                <Animated.Image
                    source={stickerSource}
                    style={[imageStyle, { width: imageSize, height: imageSize }]}
                    resizeMode="contain"
                />
            </GestureDetector>
        </View>
    );
}
