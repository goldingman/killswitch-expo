import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/login";
import SignupScreen from "../screens/signup";
import WelcomeScreen from "../screens/welcome";
import { useTheme } from "@rneui/themed";
import SharedScreen from "../screens/shared";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import HomeScreen from "../screens/home";
import FolderScreen from "../screens/folder";
import AddFolderScreen from "../screens/add_folder";
import UploadScreen from "../screens/upload";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Shared"
                component={SharedScreen}
                options={{
                    tabBarLabel: "Shared",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="slideshare" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const RootNavigator = () => {
    const authed = useSelector((state) => state.auth.authed);
    const token = useSelector((state) => state.auth.token);
    console.log("authed : ", authed);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {authed && token ? (
                    <>
                        <Stack.Screen name="HomeNav" component={TabNavigator} />

                        <Stack.Screen name="Folder" component={FolderScreen} />
                        <Stack.Screen
                            name="AddFolder"
                            component={AddFolderScreen}
                        />
                        <Stack.Screen name="Upload" component={UploadScreen} />
                    </>
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
