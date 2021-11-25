import React from "react";
import { Home } from "../pages/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = createNativeStackNavigator();

export const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0B1138" },
            animation: "fade_from_bottom"
        }}
    >
        <App.Screen name="Home" component={Home} />
        {/* <App.Screen name="Game" component={Perfil} /> */}
    </App.Navigator>
)


