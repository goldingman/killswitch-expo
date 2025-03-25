import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles, Text, Button, Divider, useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { STYLES } from "../utils/styles";
import Input from "../components/input";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { uploadFile } from "../redux/actions/fileAction";

export default function UploadScreen({ navigation, route }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [folderId, setFolderId] = useState("");

    useEffect(() => {
        if (route.params) {
            setFolderId(route.params.id);
        }
    }, [route]);

    const goUpload = () => {
        // setMode(mode === 'dark' ? 'light' : 'dark');
        // navigation.navigate("Signup");
        if (!folderId || !email || !file) return;
        uploadFile(dispatch, {
            folderId: folderId,
            recipients: email,
            file: file,
        })
            .then((res) => {
                console.log("res : ", res);
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: res.message,
                });
            })
            .catch((err) => {
                console.log("err : ", err.detail[0].loc);
            });
    };

    const goPick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*", // You can restrict to specific mime types like 'application/pdf'
                copyToCacheDirectory: true,
                multiple: false,
            });
            if (result.assets && result.assets.length > 0) {
                const picked = result.assets[0];
                console.log("File picked:", picked);
                setFile(picked);
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "No file selected",
                });
            }
        } catch (error) {
            console.error("Document pick error:", error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Document pick error",
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        // navigation.goBack();
                        navigation.navigate("HomeNav");
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
                <Text h4 style={{ color: theme.colors.primary }}>
                    Upload file
                </Text>
                <View style={{ width: 24, height: 24 }}></View>
            </View>
            <View style={styles.body}>
                <Input
                    placeholder="Email"
                    value={email}
                    errorMessage={"Please input emails by comma"}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="File Name"
                    value={file?.name}
                    disabled
                    errorMessage={"Picked file will be displayed here"}
                />
                <View style={[STYLES.wFull, STYLES.mt20]}>
                    <Button size="md" onPress={goPick}>
                        Pick a file
                    </Button>
                    <Divider style={[STYLES.mv12, STYLES.mh12]} />
                    <Button
                        size="md"
                        type="clear"
                        onPress={goUpload}
                        containerStyle={{
                            backgroundColor:
                                !file || !email
                                    ? theme.colors.grey3
                                    : theme.colors.grey0,
                        }}
                        color={theme.colors.greyOutline}
                        disabled={!file || !email}
                    >
                        Upload
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
    body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingTop: 50,
        paddingHorizontal: theme.spacing.lg,
    },
    text: {
        marginVertical: theme.spacing.lg,
        textAlign: "center",
    },
    textTerms: {
        textDecorationLine: "underline",
    },
    googleIcon: {
        width: 24,
        height: 24,
        resizeMode: "cover",
    },
}));
