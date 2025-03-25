import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import SERVER from "./server/server";
import { Spinner } from "./components/spinner";
import RootNavigator from "./navigator/root";

export const AppRoot = () => {
    const loading = useSelector((state) => state.auth.loading);
    const loadingText = useSelector((state) => state.auth.loadingText);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            SERVER.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    return (
        <>
            <RootNavigator />
            <Spinner visible={loading} loadingText={loadingText} />
        </>
    );
};
