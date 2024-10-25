import {View, Image, Text, StyleSheet} from 'react-native';
import { Ionicons, Feather, AntDesign} from '@expo/vector-icons';

interface User {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
}

interface Post {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  user: User;
}

interface PostListItemProps {
  post: Post;
}

export default function PostListItem( { post }: PostListItemProps ){
    return (
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.user.image_url }} style={styles.avatar} />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image_url }} style={styles.postImage} />
  
          {/* Icons */}
          <View style={styles.iconRow}>
            <AntDesign name="hearto" size={20} />
            <Ionicons name="chatbubble-outline" size={20} />
            <Feather name="send" size={20} />
  
            <Feather name="bookmark" size={20} style={styles.iconRight} />
          </View>
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
    width: 56,
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
  iconRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  iconRight: {
    marginLeft: 'auto',
  },
});