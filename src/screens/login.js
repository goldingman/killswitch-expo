import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
    makeStyles,
    Text,
    Button,
    Divider,
    useTheme,
    Image,
} from "@rneui/themed";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { STYLES } from "../utils/styles";
import Input from "../components/input";
import { validateEmail } from "../utils/validate";
import Checkbox from "expo-checkbox";
import { login } from "../redux/actions/authAction";
import AppLogo from "../components/logo";

export default function LoginScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goSignup = () => {
        // setMode(mode === 'dark' ? 'light' : 'dark');
        navigation.navigate("Signup");
    };

    const goLogin = () => {
        login(dispatch, {
            username: email,
            password: password,
        })
            .then((res) => {
                if (res) {
                    navigation.navigate("HomeNav");
                } else {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Something went wrong",
                    });
                }
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
            <View style={styles.body}>
                <AppLogo />
                <Text
                    h3
                    style={{
                        color: theme.colors.grey1,
                        marginTop: 30,
                        marginBottom: 20,
                    }}
                >
                    Welcome to our app!
                </Text>
                <Input
                    placeholder="Email"
                    value={email}
                    errorMessage={
                        !validateEmail(email)
                            ? "Please enter a valid email"
                            : null
                    }
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    password
                    errorMessage={
                        password.length < 6
                            ? "Please enter a valid password"
                            : null
                    }
                    onChangeText={setPassword}
                />
                <View style={[STYLES.wFull, STYLES.mt20]}>
                    <Button
                        size="md"
                        onPress={goLogin}
                        disabled={!validateEmail(email) || !password}
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
        </View>
    );
}

const useCustomButtonStyle = makeStyles((theme, disabled) => ({
    titleStyle: {
        color: disabled ? theme.colors.grey3 : theme.colors.grey0,
        marginLeft: theme.spacing.sm,
    },
}));

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: theme.spacing.lg,
    },
    body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
