import { Text, View, Image, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToS3 } from '@/aws-config';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if(!image){
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      try {
        const response = await uploadImageToS3(result.assets[0].uri);
        console.log('Image uploaded successfully:', response);
        // Optionally handle the response, e.g., save the S3 URL in your post data
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

    return (
      <View className="p-3 items-center flex-1">
        { /* Image Picker */ }
        {image ? (<Image source={{uri: image}}
        className="w-64 aspect-[3/4] rounded-lg shadow-md"
        />
        ) : (
          <View className="w-64 aspect-[3/4] rounded-lg shadow-md" />
        )}

        <Text onPress={pickImage} className="text-blue-500 font-semibold m-5"> Change</Text>
        
        { /* TextInput for caption */ }
        <TextInput value={caption} onChangeText={(newValue) => setCaption(newValue)} placeholder="What's on your mind" className=" w-full p-3" />
        
        { /* Button */ }
        <View className="mt-auto w-full">
        <Pressable className="bg-blue-500 w-full p-4 items-center rounded-md">
          <Text className="text-white font-semibold"> Upload </Text>
        </Pressable>
        </View>
      </View>
    );
  }
  