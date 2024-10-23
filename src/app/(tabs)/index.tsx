import {FlatList} from "react-native";
import posts from '@/assets/data/posts.json';
import PostListItem from "@/components/PostListItem";

export default function FeedScreen() {

  return(
    <FlatList
    data={posts}
    renderItem={({item}) => <PostListItem post={item} /> }
    contentContainerStyle={{gap:10, backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}
    />
  )
  // return(
  //   <View>
  //     <PostListItem post={posts[0]} />
  //     <PostListItem post={posts[1]} />
  //   </View>
  // )
  }
  