import React, { Suspense, useContext, useEffect, lazy } from "react";
import { Platform, View } from "react-native";
import { useLocation } from "react-router-dom";

import AppHeader from "../components/app/AppHeader";
import Text from "../components/Text";
import { HEADER_HEIGHT } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import { GlobalContext } from "../context/GlobalContext";

const Screen = props => {
    if (Platform.OS !== "web") return <AppScreen {...props} />;

    const { setLocale } = useContext(GlobalContext);

    const query = useQuery();
    const locale = query.get("locale");
    useEffect(() => {
        if (locale) {
            setLocale(locale);
        }
    }, [query]);

    return (
        <Suspense fallback={() => <Text>Loading</Text>}>
            <WebScreen {...props} />
        </Suspense>
    );
};

const WebScreen = props => {
    const { address, chainId } = useContext(EthersContext);
    const ConnectToWallet = lazy(() => import("../components/web/ConnectToWallet"));
    if (!address) return <ConnectToWallet />;
    if (chainId !== 1)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text light={true} style={{ textAlign: "center" }}>
                    {"Please switch network to\n'Ethereum Mainnet'"}
                </Text>
            </View>
        );
    return (
        <View
            {...props}
            style={[{ position: "absolute", top: HEADER_HEIGHT, right: 0, bottom: 0, left: 0 }, props.style]}
        />
    );
};

const AppScreen = props => (
    <Suspense fallback={() => <Text>Loading</Text>}>
        <View style={{ width: "100%", height: "100%" }}>
            <AppHeader />
            <View {...props} style={[{ flex: 1 }, props.style]} />
        </View>
    </Suspense>
);

const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};

export default Screen;
