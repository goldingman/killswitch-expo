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
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { STYLES } from "../utils/styles";
import Input from "../components/input";
import { validateEmail } from "../utils/validate";
import Checkbox from "expo-checkbox";
import { signup } from "../redux/actions/authAction";

export default function SignupScreen({ navigation }) {
    const styles = useStyles();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const goSignup = () => {
        if (
            password !== confirmPassword ||
            password.length < 6 ||
            !validateEmail(email)
        ) {
            return;
        }

        signup(dispatch, {
            username: email,
            email: email,
            password: password,
        })
            .then((res) => {
                if (res) {
                    navigation.navigate("login");
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

    const goLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {/* <Image
                    source={require("../assets/appname.png")}
                    style={{ width: 160, height: 60, resizeMode: "contain" }}
                /> */}
                <Text h2>Sign Up</Text>
                <Text style={styles.text}>Thanks for reaching out to us.</Text>
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
                            ? "Password length should be at least 6"
                            : null
                    }
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirm password"
                    value={confirmPassword}
                    password
                    errorMessage={
                        password !== confirmPassword
                            ? "Password does not match"
                            : null
                    }
                    onChangeText={setConfirmPassword}
                />
                <View style={STYLES.wFull}>
                    <View style={[STYLES.row, { marginBottom: 48 }]}>
                        <Checkbox
                            color={
                                checked
                                    ? theme.colors.primary
                                    : theme.colors.grey4
                            }
                            value={checked}
                            onValueChange={setChecked}
                        />
                        <Text
                            style={[
                                STYLES.ml12,
                                { width: "90%", lineHeight: 20 },
                            ]}
                        >
                            I agree to{" "}
                            <Text style={styles.textTerms}>
                                Terms of Use & Privacy Policy
                            </Text>
                        </Text>
                    </View>

                    <Button size="md" onPress={goLogin}>
                        Sign In
                    </Button>
                    <Divider style={[STYLES.mv12, STYLES.mh12]} />
                    <Button
                        size="md"
                        type="clear"
                        onPress={goSignup}
                        disabled={
                            !checked || !email || !password || !confirmPassword
                        }
                        containerStyle={{
                            backgroundColor:
                                !checked ||
                                !email ||
                                !password ||
                                !confirmPassword
                                    ? theme.colors.grey5
                                    : theme.colors.grey0,
                        }}
                        color={theme.colors.greyOutline}
                    >
                        Sign Up
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
