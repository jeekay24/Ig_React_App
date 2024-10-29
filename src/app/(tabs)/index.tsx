import {FlatList, View} from "react-native";
import posts from '@/assets/data/posts.json';
import { useState, useEffect } from "react";
import PostListItem from "@/components/PostListItem";

export default function FeedScreen() {

  return(
    <FlatList
    data={posts}
    renderItem={({item}) => <PostListItem post={item} /> }
    contentContainerStyle={{gap:10, maxWidth:512, alignSelf:'center', width:'100%', backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}
    />
  )
  }
  