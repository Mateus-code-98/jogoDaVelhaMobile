import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from "../pages/SignIn";

const Auth = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        initialRouteName="SignIn"
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0B1138" },
            animation: "fade_from_bottom"
        }}
    >
        <Auth.Screen name="SignIn" component={SignIn} />
    </Auth.Navigator>
)


