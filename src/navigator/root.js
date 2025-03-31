import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/login";
import SignupScreen from "../screens/signup";
import HomeNavigator from "./homeNav";
import AddFolderScreen from "../screens/add_folder";
import FolderScreen from "../screens/folder";
import UploadScreen from "../screens/upload";

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
    const authed = useSelector((state) => state.auth.authed);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen
                    name="HomeNav"
                    component={HomeNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
