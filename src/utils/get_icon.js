import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const getIcon = (type, theme) => {
    if (type.startsWith("image/"))
        return (
            <Ionicons
                name="image-outline"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type.startsWith("video/"))
        return (
            <Ionicons
                name="videocam-outline"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type.startsWith("audio/"))
        return (
            <MaterialIcons
                name="audio-file"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type === "application/pdf")
        return (
            <AntDesign name="pdffile1" size={24} color={theme.colors.primary} />
        );
    if (
        type === "application/msword" ||
        type === "application/vnd.google-apps.document"
    )
        return (
            <AntDesign
                name="wordfile1"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (
        type === "application/vnd.ms-excel" ||
        type === "application/vnd.google-apps.spreadsheet"
    )
        return (
            <FontAwesome
                name="file-excel-o"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (
        type === "application/vnd.ms-powerpoint" ||
        type === "application/vnd.google-apps.presentation" ||
        type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )
        return (
            <FontAwesome
                name="file-powerpoint-o"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type === "text/plain")
        return (
            <AntDesign
                name="filetext1"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type === "application/zip")
        return (
            <FontAwesome
                name="file-zip-o"
                size={24}
                color={theme.colors.primary}
            />
        );
    if (type === "application/octet-stream")
        return (
            <AntDesign name="lock1" size={24} color={theme.colors.primary} />
        );
    if (type === "application/vnd.google-apps.folder")
        return (
            <AntDesign name="folder1" size={24} color={theme.colors.primary} />
        );

    return <AntDesign name="file1" size={24} color={theme.colors.primary} />;
};
