import { Text, View, Image, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToS3, savePostToDynamoDB} from '@/aws-config';

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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (image && caption) {
      try {
        // Step 1: Upload image to S3 and get the URL
        const {Location:imageURL} = await uploadImageToS3(image);

        // Step 2: Save post data (imageURL and caption) to DynamoDB
        await savePostToDynamoDB(imageURL, caption);
        console.log('Post saved successfully');
      
      } catch (error) {
        console.error('Error uploading post:', error);
      }
    } else {
      console.log("Image or caption is missing");
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
        
        { /* Upload Button */ }
        <View className="mt-auto w-full">
        <Pressable onPress={handleUpload} className="bg-blue-500 w-full p-4 items-center rounded-md">
          <Text className="text-white font-semibold"> Upload </Text>
        </Pressable>
        </View>
      </View>
    );
  }
  