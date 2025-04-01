import React, { useEffect, useState } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clearDownload, getSharedFiles } from "../redux/actions/fileAction";
import Toast from "react-native-toast-message";
import { getIcon } from "../utils/get_icon";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import * as Sharing from "expo-sharing";
import { shortName } from "../utils/shortName";
import { BASE_URL } from "../server/server";

export default function SharedScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const sharedFiles = useSelector((state) => state.file.sharedFiles);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [progress, setProgress] = useState(0);
    const [downloadID, setDownloadID] = useState(null);

    useEffect(() => {
        if (user) {
            getSharedFiles(dispatch)
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

    const Item = ({ id, name, g_id, type }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                getFile(id, name, g_id);
            }}
        >
            {getIcon(type, theme)}
            <Text style={styles.listText}>{shortName(name, 43)}</Text>
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
                <View style={{ width: 24, height: 24 }}></View>
                <Text h4 style={{ color: theme.colors.primary }}>
                    Shared with Me
                </Text>
                <View style={{ width: 24, height: 24 }}></View>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={sharedFiles}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            name={item.name}
                            g_id={item.g_id}
                            type={item.file_type}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={
                        <View style={{ width: "100%", height: 150 }} />
                    }
                    removeClippedSubviews={false}
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
