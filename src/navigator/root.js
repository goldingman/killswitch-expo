import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/login";
import SignupScreen from "../screens/signup";
import HomeNavigator from "./homeNav";
import WelcomeScreen from "../screens/welcome";
import { useTheme } from "@rneui/themed";
import SharedScreen from "../screens/shared";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
    );
};

const TabNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
            }}
            initialRouteName="HomeNavd"
        >
            <Tab.Screen
                name="HomeNavd"
                component={HomeNavigator}
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
    console.log("authed : ", authed);

    return (
        <NavigationContainer>
            {/* {authed ? (
                    <Stack.Screen name="TabNav" component={TabNavigator} />
                ) : (
                    <Stack.Screen name="AuthNav" component={AuthNavigator} />
                )} */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="HomeNav" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
