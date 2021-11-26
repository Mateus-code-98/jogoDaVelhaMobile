import React from "react";
import { Home } from "../pages/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Game } from "../pages/Game";

const App = createNativeStackNavigator();

export const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0B1138" },
            animation: "flip"
        }}
    >
        <App.Screen name="Home" component={Home} />
        <App.Screen name="Game" component={Game} />
    </App.Navigator>
)


