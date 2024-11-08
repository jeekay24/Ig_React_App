import { Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{tabBarActiveTintColor:"black",tabBarShowLabel:false}}>

            <Tabs.Screen name="index" options={{headerTitle: "Instagram",headerTitleAlign:"center",tabBarIcon: ({color}) => <FontAwesome name="home" size={26} color={color} />}}/>

            <Tabs.Screen name="post" options={{headerTitle: "Create Post",headerTitleAlign:"center",tabBarIcon: ({color}) => <FontAwesome name="plus-square-o" size={26} color={color} />}}/>

            <Tabs.Screen name="profile" options={{headerTitle: "Profile",headerTitleAlign:"center",tabBarIcon: ({color}) => <FontAwesome name="user" size={26} color={color} />}}/>

        </Tabs>

        
    );
}

