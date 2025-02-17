import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';


const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ['images'],
    })

    if (!result.canceled) {
      console.log(result);
      {
        /* The result will be an object like this (on the web):
          {
            "assets": [
              {
                "fileName": "some-image.png",
                "height": 720,
                "mimeType": "image/png",
                "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA"
              }
            ],
            "canceled": false
          }
        */
      }
      return result.assets[0].uri;
    } else {
      alert("You need to provide a photo");
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link> */}

      <View style={styles.imageContainer}>
        <ImageViewer imageSource={PlaceholderImage} />
      </View>

      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
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
  }
});
