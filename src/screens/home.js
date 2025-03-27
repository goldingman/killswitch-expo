import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getFolders } from "../redux/actions/fileAction";
import Toast from "react-native-toast-message";
import { shortName } from "../utils/shortName";

export default function HomeScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.file.folders);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            getFolders(dispatch, { user_id: user.id, my_gid: user.my_gid })
                .then((res) => {})
                .catch((err) => {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: err,
                    });
                });
        }
    }, [navigation, user]);

    const Item = ({ id, name, g_id }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                navigation.navigate("Folder", { id, name, g_id });
            }}
        >
            <AntDesign name="folder1" size={24} color={theme.colors.primary} />
            <Text style={styles.listText}>{shortName(name, 43)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 24, height: 24 }}></View>
                <Text h4 style={{ color: theme.colors.primary }}>
                    My Driver
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AddFolder");
                    }}
                >
                    <AntDesign
                        name="addfolder"
                        size={24}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={folders}
                    renderItem={({ item }) => (
                        <Item id={item.id} name={item.name} g_id={item.g_id} />
                    )}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={
                        <View style={{ width: "100%", height: 150 }} />
                    }
                />
            </View>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
    },
    body: {
        display: "flex",
        width: "100%",
        marginTop: 10,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        height: 100,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.sm,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 3,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        borderBottomColor: theme.colors.greyOutline,
        borderBottomWidth: 1,
    },
    listText: {
        marginLeft: 10,
    },
}));
