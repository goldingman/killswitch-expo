import * as React from "react";
import HomeScreen from "../screens/home";
import AddFolderScreen from "../screens/add_folder";
import FolderScreen from "../screens/folder";
import UploadScreen from "../screens/upload";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Folder" component={FolderScreen} />
            <Stack.Screen name="AddFolder" component={AddFolderScreen} />
            <Stack.Screen name="Upload" component={UploadScreen} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
