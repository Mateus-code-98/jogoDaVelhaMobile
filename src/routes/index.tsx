import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { UserRoutes } from "./userRoutes";


const Auth = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        initialRouteName="SignIn"
        
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#312E38" },
            animation: "fade_from_bottom"
        }}
    >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="Home" component={UserRoutes} />
    </Auth.Navigator>
)


