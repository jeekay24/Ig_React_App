import {FlatList, View, Text, ActivityIndicator, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import PostListItem from "@/components/PostListItem";
import { fetchPostsFromDynamoDB } from "@/aws-config";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

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
  const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
      try {
        const dynamoPosts: DocumentClient.ItemList | undefined = await fetchPostsFromDynamoDB();

        const formattedPosts = (dynamoPosts || []).map((post) => ({
          id: post.postId || "",
          image_url: post.imageURL || "",
          caption: post.caption || "",
          createdAt: post.createdAt || new Date().toISOString(), // Make sure to use a timestamp
          user: {
            id: post.user?.id || "user1", // You can fetch the user data from your database if needed
            user_image_url: post.user?.user_image_url || "https://ig-clone-24.s3.us-east-1.amazonaws.com/1730283974240.jpg", // Placeholder or fetched user image URL
            username: post.user?.username || "jeekay24", // Placeholder or fetched username
          },
        }));

    // Sort posts by creation date, newest first
    const sortedPosts = formattedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
  
    setPosts([...sortedPosts, ...mockPosts]); // Set both fetched and mock posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {  
    loadPosts(); // Call the loadPosts function
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    ); // Show a loading message while fetching posts
  }

  return(
    <FlatList
    data={posts}
    renderItem={({item}) => <PostListItem post={item} /> }
    keyExtractor={(item) => item.id}
    contentContainerStyle={{gap:10, maxWidth:512, alignSelf:'center', width:'100%', backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}
    refreshing={loading}
    onRefresh={loadPosts}
    />
  );
}

const styles= StyleSheet.create({
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
});
  