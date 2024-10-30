import {FlatList, View, Text} from "react-native";
//import posts from '@/assets/data/posts.json';
import { useState, useEffect } from "react";
import PostListItem from "@/components/PostListItem";
import { fetchPostsFromDynamoDB } from "@/aws-config";

interface User {
  id: string; // User ID
  avatar_url: string; // User avatar URL (if needed)
  image_url: string; // User image URL
  username: string; // User name
}

interface Post {
  id: string; // Post ID
  image: string; // This is in your structure but not used in PostListItem
  image_url: string; // Post image URL
  caption: string; // Post caption
  user: User; // User object
}


export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

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
  