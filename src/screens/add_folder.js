import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
    makeStyles,
    Text,
    Button,
    Divider,
    useTheme,
    Image,
} from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { STYLES } from "../utils/styles";
import Input from "../components/input";
import { validateEmail } from "../utils/validate";
import Checkbox from "expo-checkbox";
import { login } from "../redux/actions/authAction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createFolder } from "../redux/actions/fileAction";
import { setFolders } from "../redux/reducers/fileReducer";
import SERVER from "../server/server";

export default function AddFolderScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const folders = useSelector((state) => state.file.folders);
    const [folderName, setFolderName] = useState("");

    const goCreate = () => {
        createFolder(dispatch, {
            name: folderName,
            parent_id: user.my_gid,
            user_id: user.id,
        })
            .then((res) => {
                setFolderName("");
                dispatch(setFolders([...folders, res]));
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: `Folder ${folderName} created successfully.`,
                });
            })
            .catch((err) => {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: err,
                });
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
                <Text h4 style={{ color: theme.colors.primary }}>
                    Create Folder
                </Text>
                <View style={{ width: 24, height: 24 }}></View>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>
                    You can create a folder on your Google Drive
                </Text>
                <Input
                    placeholder="Folder Name"
                    value={folderName}
                    errorMessage={
                        !folderName ? "Please enter a folder name" : null
                    }
                    onChangeText={setFolderName}
                />
                <View style={[STYLES.wFull, STYLES.mt20]}>
                    <Button size="md" onPress={goCreate} disabled={!folderName}>
                        Create Folder
                    </Button>
                </View>
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
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: theme.spacing.lg,
    },
    text: {
        marginVertical: theme.spacing.lg,
        width: "100%",
    },
    textTerms: {
        textDecorationLine: "underline",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        height: 60,
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
}));
