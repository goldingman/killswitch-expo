import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { downloadFile, getFiles } from "../redux/actions/fileAction";
import { getIcon } from "../utils/get_icon";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Progress from "react-native-progress";
import * as Sharing from "expo-sharing";

export default function FolderScreen({ navigation, route }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.file.folders);
    const [folderId, setFolderId] = useState("");
    const [folderName, setFolderName] = useState("");
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [downloadID, setDownloadID] = useState(null);

    useEffect(() => {
        if (route.params) {
            setFolderId(route.params.id);
            setFolderName(route.params.folderName);
        }
    }, [route, navigation]);

    useEffect(() => {
        if (folderId)
            getFiles(dispatch, folderId)
                .then((res) => {
                    setFiles(res);
                })
                .catch((err) => {
                    console.log("err : ", err);
                });
    }, [folderId]);

    const onUpload = () => {
        navigation.navigate("Upload", { id: folderId });
    };

    const saveToGallery = async (uri, filename, mimeType) => {
        // if (await Sharing.isAvailableAsync()) {
        //     await Sharing.shareAsync(uri);
        // }
        console.log("mimeType : ", mimeType, filename);
        const downloadDir =
            FileSystem.StorageAccessFramework.getUriForDirectoryInRoot(
                "Download/Killswitch"
            );
        const permission =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
                downloadDir
            );
        if (!permission.granted) {
            return;
        }
        console.log("permission : ", permission, downloadDir);
        const destinationUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
                permission.directoryUri,
                filename,
                mimeType
            );
        console.log("destinationUri : ", destinationUri);
        const contents =
            await FileSystem.StorageAccessFramework.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

        const resp = await FileSystem.StorageAccessFramework.writeAsStringAsync(
            destinationUri,
            contents,
            { encoding: FileSystem.EncodingType.Base64 }
        );

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
                console.log("final downloaded : ", res);
                setProgress(1);
                setDownloadID(null);
                if (res.uri) {
                    saveToGallery(
                        res.uri,
                        fileName,
                        res.headers["content-type"]
                    );
                }
            })
            .catch((err) => {
                console.error("Download error:", err);
                setProgress(1);
                setDownloadID(null);
            });
    };

    const Item = ({ title, type, id }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (downloadID) return;
                if (type === "application/vnd.google-apps.folder") {
                    navigation.navigate("Folder", { id, folderName: title });
                } else {
                    getFile(id, title.replace(/\.enc$/, ""));
                }
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
                            type={item.mimeType}
                            title={item.name}
                            id={item.id}
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
