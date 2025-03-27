import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import HomeScreen from "../screens/home";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import SharedScreen from "../screens/shared";

const Tab = createBottomTabNavigator();

function HomeNavigator() {
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
            {/* <Tab.Screen
                name="Signed"
                component={DealListScreen}
                options={{
                    tabBarLabel: "My Deals",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="handshake"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}

export default HomeNavigator;
