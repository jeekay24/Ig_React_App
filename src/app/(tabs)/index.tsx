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
  const [loading, setLoading] = useState(true);

  // Fetch posts from DynamoDB when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsFromDynamoDB();
        const formattedPosts = fetchedPosts.map((item) => ({
          id: item.postId, // Ensure this maps correctly
          image: item.imageURL, // This field may not be used but should be included if needed
          image_url: item.imageURL, // Ensure this maps correctly
          caption: item.caption, // Ensure this maps correctly
          user: {
            id: item.userId, // Ensure you have a userId or similar
            avatar_url: item.avatar_url || '', // Provide a default if not available
            image_url: item.user_image_url || '', // Provide a default if not available
            username: item.username, // Ensure you have a username field
          },
        }));
        setPosts(formattedPosts); // Set the posts state with fetched data
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
  