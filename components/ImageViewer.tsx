import { Image, ImageSource } from 'expo-image';
import { StyleSheet } from 'react-native';

type ImageViewerProps = {
  imageSource: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({
  imageSource,
  selectedImage,
}: ImageViewerProps) {
  const image = selectedImage ? { uri: selectedImage } : imageSource;
  return <Image source={image} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
