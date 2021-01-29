import React from "react";
import { View } from "react-native";

import AppHeader from "../components/app/AppHeader";

const Screen = props => {
    return <AppScreen {...props} />;
};

const AppScreen = props => (
    <View style={{ width: "100%", height: "100%" }}>
        <AppHeader />
        <View {...props} style={[{ flex: 1 }, props.style]} />
    </View>
);

export default Screen;
