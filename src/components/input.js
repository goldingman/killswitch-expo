import React, { useState, useContext } from "react";
import { Input as RNEInput, ThemeContext } from "@rneui/themed";

const Input = (props) => {
    const [focused, setFocused] = useState(false);
    const [showPasswordText, togglePasswordText] = useState(false);
    const { theme } = useContext(ThemeContext);

    const onFocus = () => {
        setFocused(true);
        props.onFocus();
    };

    const onBlur = () => {
        setFocused(false);
        props.onBlur();
    };

    const primaryColor = theme.colors.primary;

    const inputContainerStyle = {
        ...props.inputContainerStyle,
        ...(focused ? { borderColor: primaryColor } : {}),
    };

    const labelStyle = {
        ...props.labelStyle,
        ...(focused ? { color: primaryColor } : {}),
    };

    const leftIcon = {
        ...props.leftIcon,
        ...(focused ? { color: primaryColor } : {}),
    };

    let rightIcon = {
        ...props.rightIcon,
        ...(focused ? { color: primaryColor } : {}),
    };

    if (props.password) {
        let passwordToggler = {
            type: "ionicon",
            name: showPasswordText ? "eye" : "eye-off",
            onPress: () => togglePasswordText(!showPasswordText),
            containerStyle: { marginRight: 10 },
            underlayColor: "transparent",
        };

        rightIcon = {
            ...rightIcon,
            ...passwordToggler,
        };
    }

    return (
        <RNEInput
            {...props}
            onFocus={onFocus}
            onBlur={onBlur}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            inputContainerStyle={inputContainerStyle}
            labelStyle={labelStyle}
            password={showPasswordText ? false : true}
            secureTextEntry={props.password && !showPasswordText ? true : false}
            multiline={props?.multiline}
            inputStyle={{
                textAlignVertical: props?.multiline ? "top" : "center",
            }}
        />
    );
};

Input.defaultProps = {
    onFocus: () => null,
    onBlur: () => null,
    leftIcon: {},
    rightIcon: {},
    labelStyle: {},
    password: false,
    multiline: false,
};

export default Input;
