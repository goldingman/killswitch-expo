import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import HomeScreen from "../screens/home";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import SharedScreen from "../screens/shared";
import AddFolderScreen from "../screens/add_folder";
import FolderScreen from "../screens/folder";
import UploadScreen from "../screens/upload";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const MainStack = createNativeStackNavigator();


const MainNavigator = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
            />
            <MainStack.Screen
                name="AddFolder"
                component={AddFolderScreen}
            />
            <MainStack.Screen name="Folder" component={FolderScreen} />
            <MainStack.Screen name="Upload" component={UploadScreen} />
        </MainStack.Navigator>
    );
};

function HomeNavigator() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
            }}
            // initialRouteName="Home"
        >
            <Tab.Screen
                name="MainNav"
                component={MainNavigator}
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
