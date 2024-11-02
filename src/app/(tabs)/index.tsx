import {FlatList, View, Text} from "react-native";
//import posts from '@/assets/data/posts.json';
import { useState, useEffect } from "react";
import PostListItem from "@/components/PostListItem";
import { fetchPostsFromDynamoDB } from "@/aws-config";

interface User {
  id: string; // User ID
  user_image_url: string; // User image URL
  username: string; // User name
}

interface Post {
  id: string; // Post ID
  image_url: string; // Post image URL
  caption: string; // Post caption
  user: User; // User object
}

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const mockPosts = [
      {
        id: "1",
        image_url: "https://ig-clone-24.s3.amazonaws.com/1730548185452.jpg",
        caption: "Thala for a reason 😎💥",
        user: {
          id: "user1",
          user_image_url: "https://ig-clone-24.s3.us-east-1.amazonaws.com/1730283974240.jpg",
          username: "jeekay24",
        },
      },
      {
        id: "2",
        image_url: "https://ig-clone-24.s3.amazonaws.com/1730283974240.jpg",
        caption: "Night sky 🌃",
        user: {
          id: "user2",
          user_image_url: "https://ig-clone-24.s3.us-east-1.amazonaws.com/1730283974240.jpg",
          username: "jeekay24",
        },
      },
    ];
  
    setPosts(mockPosts); // Set mock posts to verify rendering
  }, []);

  return(
    <FlatList
    data={posts}
    renderItem={({item}) => <PostListItem post={item} /> }
    keyExtractor={(item) => item.id}
    contentContainerStyle={{gap:10, maxWidth:512, alignSelf:'center', width:'100%', backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}
    />
  );
}
  