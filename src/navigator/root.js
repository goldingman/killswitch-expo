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
import WelcomeScreen from "../screens/welcome";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const authed = useSelector((state) => state.auth.authed);
    console.log("authed : ", authed);
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
                {authed ? (
                    <Stack.Screen name="HomeNav" component={HomeNavigator} />
                ) : (
                    <>
                        <Stack.Screen
                            name="Welcome"
                            component={WelcomeScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
