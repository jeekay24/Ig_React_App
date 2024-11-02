import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons, Feather, AntDesign} from '@expo/vector-icons';

interface User {
  id: string;
  user_image_url: string;
  username: string;
}

interface Post {
  id: string;
  image_url: string;
  caption: string;
  user: User;
  liked: boolean;
}

interface PostListItemProps {
  post: Post;
  toggleLike: (postId: string) => void; // Add toggleLike function prop
}

export default function PostListItem( { post, toggleLike }: PostListItemProps ){
    return (
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.user.user_image_url }} style={styles.avatar} />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post.image_url }} style={styles.postImage} />
  
          {/* Icons */}
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => toggleLike(post.id)}>
              <AntDesign name={post.liked ? "heart": "hearto"} size={20} color={post.liked ? '#FD1D1D' : 'black'} />
            </TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={20} />
            <Feather name="send" size={20} />
            <Feather name="bookmark" size={20} style={styles.iconRight} />
          </View>

          {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.username}>{post.user.username}</Text>
        {'  '}
        {post.caption}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 46,
    aspectRatio: 1,
    borderRadius: 28,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  caption: {
    padding: 8,
    fontSize: 14,
    color: 'black',
    marginLeft: 8,
  },
  iconRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  iconRight: {
    marginLeft: 'auto',
  },
});