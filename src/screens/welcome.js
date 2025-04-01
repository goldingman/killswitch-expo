import React from "react";
import { View, Image, Dimensions } from "react-native";
import { makeStyles, Text, Button, Divider, useTheme } from "@rneui/themed";
import { STYLES } from "../utils/styles";
import AppLogo from "../../assets/icon_h.png";
import Svg, { Path } from "react-native-svg";

export default function WelcomeScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();

    const goSignup = () => {
        navigation.navigate("Signup");
    };

    const goLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image
                    source={AppLogo}
                    style={{ objectFit: "contain", width: "100%", height: 150 }}
                />
                <Text
                    h4
                    style={{
                        color: theme.colors.grey1,
                        marginBottom: 20,
                        textAlign: "center",
                    }}
                >
                    Welcome to the most secure file Sharing Application
                </Text>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 178,
                }}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 20">
                    <Path
                        fill="#1FC8BE"
                        fill-opacity="1"
                        d="M0,0L21.8,5.3C43.6,11,87,21,131,21.3C174.5,21,218,11,262,48C305.5,85,349,171,393,192C436.4,213,480,171,524,133.3C567.3,96,611,64,655,80C698.2,96,742,160,785,170.7C829.1,181,873,139,916,128C960,117,1004,139,1047,160C1090.9,181,1135,203,1178,218.7C1221.8,235,1265,245,1309,213.3C1352.7,181,1396,107,1418,69.3L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></Path>
                </Svg>
            </View>
            <View style={styles.footer}>
                <Button
                    size="md"
                    type="clear"
                    onPress={goLogin}
                    containerStyle={{
                        backgroundColor: theme.colors.background,
                    }}
                >
                    Log In
                </Button>
                <Divider style={[STYLES.mv12, STYLES.mh12]} />
                <Button
                    size="md"
                    type="clear"
                    onPress={goSignup}
                    containerStyle={{
                        backgroundColor: theme.colors.grey0,
                    }}
                    color={theme.colors.greyOutline}
                >
                    Create an account
                </Button>
            </View>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: theme.spacing.lg,
        position: "absolute",
        top: 0,
        height: Dimensions.get("screen").height * 0.6,
        backgroundColor: "white",
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
    footer: {
        width: "100%",
        height: Dimensions.get("screen").height * 0.4,
        marginTop: 100,
        backgroundColor: theme.colors.primary,
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: theme.spacing.lg,
    },
}));
