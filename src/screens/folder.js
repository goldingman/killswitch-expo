import React, { useEffect, useState, useCallback } from "react";
import {
    BackHandler,
    FlatList,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { clearDownload, getFiles } from "../redux/actions/fileAction";
import { getIcon } from "../utils/get_icon";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";
import { shortName } from "../utils/shortName";
import { BASE_URL } from "../server/server";
import {
    useNavigation,
    useRoute,
    useFocusEffect,
} from "@react-navigation/native";

export default function FolderScreen() {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const files = useSelector((state) => state.file.files);
    const token = useSelector((state) => state.auth.token);
    const [folderId, setFolderId] = useState("");
    const [folderName, setFolderName] = useState("");
    const [folderGId, setFolderGId] = useState("");
    const [progress, setProgress] = useState(0);
    const [downloadID, setDownloadID] = useState(null);

    useFocusEffect(
        useCallback(() => {
            if (route.name === "Folder") {
                const onBackPress = () => {
                    navigation.navigate("Home");
                    return true;
                };

                BackHandler.addEventListener("hardwareBackPress", onBackPress);
                return () => {
                    BackHandler.removeEventListener(
                        "hardwareBackPress",
                        onBackPress
                    );
                };
            }
        }, [route.name])
    );

    useEffect(() => {
        if (route.params) {
            setFolderId(route.params.id);
            setFolderName(route.params.name);
            setFolderGId(route.params.g_id);
        }
    }, [route]);

    useEffect(() => {
        if (folderGId)
            getFiles(dispatch, folderGId)
                .then((res) => {})
                .catch((err) => {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Failed to load files",
                    });
                });
    }, [folderGId]);

    const onUpload = () => {
        navigation.navigate("Upload", {
            id: folderId,
            g_id: folderGId,
            name: folderName,
        });
    };

    const saveToGallery = async (uri, filename, mimeType) => {
        if (Platform.OS == "ios") {
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            }
        } else {
            const downloadDir =
                FileSystem.StorageAccessFramework.getUriForDirectoryInRoot(
                    "Download"
                );
            const permission =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
                    downloadDir
                );
            console.log("permission : ", uri, filename, mimeType);
            if (!permission.granted) {
                return;
            }
            console.log("destinationUri : ", destinationUri);
            const destinationUri =
                await FileSystem.StorageAccessFramework.createFileAsync(
                    permission.directoryUri,
                    filename,
                    mimeType
                );
            const contents =
                await FileSystem.StorageAccessFramework.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

            const resp =
                await FileSystem.StorageAccessFramework.writeAsStringAsync(
                    destinationUri,
                    contents,
                    { encoding: FileSystem.EncodingType.Base64 }
                );
            console.log("res : ", resp);
        }
    };

    const getFile = async (fileId, fileName, fileGid) => {
        setDownloadID(fileId);
        setProgress(0);
        const downloadUrl = `${BASE_URL}/downloads/${fileGid}`;
        const fileUri = FileSystem.documentDirectory + fileName;

        const callback = (downloadProgress) => {
            const progressFraction =
                downloadProgress.totalBytesWritten /
                downloadProgress.totalBytesExpectedToWrite;
            setProgress(progressFraction);
        };

        const downloadResumable = FileSystem.createDownloadResumable(
            downloadUrl,
            fileUri,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            callback
        );

        downloadResumable
            .downloadAsync()
            .then(async (res) => {
                setProgress(1);
                setDownloadID(null);

                clearDownload(dispatch);
                console.log("download : ", res);
                if (res.uri) {
                    saveToGallery(
                        res.uri,
                        fileName,
                        res.headers["Content-Type"]
                    );
                }
            })
            .catch((err) => {
                setProgress(1);
                setDownloadID(null);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Failed to download file",
                });
            });
    };

    const Item = ({ title, type, id, gId }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (downloadID) return;
                getFile(id, title, gId);
            }}
        >
            {getIcon(type, theme)}
            <Text style={styles.listText}>{shortName(title, 43)}</Text>
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
                <TouchableOpacity
                    onPress={() => {
                        // navigation.goBack();
                        navigation.navigate("Home");
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
                <Text h4 style={{ color: theme.colors.primary }}>
                    {folderName}
                </Text>
                <TouchableOpacity onPress={onUpload}>
                    <AntDesign
                        name="addfile"
                        size={24}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={files}
                    renderItem={({ item }) => (
                        <Item
                            type={item.file_type}
                            title={item.name}
                            id={item.id}
                            gId={item.g_id}
                        />
                    )}
                    keyExtractor={(item) => item.id}
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
