import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { downloadFile, getFolders } from "../redux/actions/fileAction";
import Toast from "react-native-toast-message";
import { getIcon } from "../utils/get_icon";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import * as Sharing from "expo-sharing";

export default function HomeScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.file.folders);
    const [progress, setProgress] = useState(0);
    const [downloadID, setDownloadID] = useState(null);

    useEffect(() => {
        getFolders(dispatch)
            .then((res) => {})
            .catch((err) => {
                console.log("err : ", err);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: err,
                });
            });
    }, [navigation]);

    const saveToGallery = async (uri) => {
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
        }
        // const { status } = await MediaLibrary.requestPermissionsAsync();
        // if (status !== "granted") {
        //     alert("Permission required to save file");
        //     return;
        // }

        // try {
        //     const asset = await MediaLibrary.createAssetAsync(uri);
        //     await MediaLibrary.createAlbumAsync(
        //         "Download_Killswitch",
        //         asset,
        //         false
        //     );
        //     alert("Saved to Downloads or Gallery!");
        // } catch (e) {
        //     console.error("Saving failed:", e);
        // }
    };

    const getFile = async (fileId, fileName) => {
        setDownloadID(fileId);
        setProgress(0);
        const downloadUrl = `http://localhost:8000/service/files/download/${fileId}`;
        const fileUri = FileSystem.documentDirectory + fileName;

        const callback = (downloadProgress) => {
            const progressFraction =
                downloadProgress.totalBytesWritten /
                downloadProgress.totalBytesExpectedToWrite;
            console.log("progress : ", progressFraction);
            setProgress(progressFraction);
        };

        const downloadResumable = FileSystem.createDownloadResumable(
            downloadUrl,
            fileUri,
            {},
            callback
        );

        downloadResumable
            .downloadAsync()
            .then((res) => {
                console.log("final downloaded");
                setProgress(1);
                setDownloadID(null);
                if (res.uri) {
                    saveToGallery(res.uri);
                }
            })
            .catch((err) => {
                console.error("Download error:", err);
                setProgress(1);
                setDownloadID(null);
            });
    };

    const Item = ({ id, title, type }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (downloadID) return;
                if (type === "application/vnd.google-apps.folder")
                    navigation.navigate("Folder", { id, folderName: title });
                else getFile(id, title.replace(/\.enc$/, ""));
            }}
        >
            {getIcon(type, theme)}
            <Text style={styles.listText}>{title}</Text>
            {downloadID === id && (
                <View
                    style={{
                        width: 40,
                        height: 40,
                        position: "absolute",
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Progress.Circle
                        size={30}
                        progress={progress}
                        indeterminate
                        borderColor={theme.colors.primary}
                        color={theme.colors.primary}
                    />
                </View>
            )}
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
                        <Item
                            id={item.id}
                            title={item.name}
                            type={item.mimeType}
                        />
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
