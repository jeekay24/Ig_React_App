import { Link, Redirect } from "expo-router";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from "react-native";

export default function Home() {
  return (
    <Redirect href="/(tabs)"/>
  );
}
