import React from "react";
import { View, StatusBar } from 'react-native';
import { AuthRoutes } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from "./src/hooks";

const App: React.FC = () => {
    return (
        <AppProvider>
            <NavigationContainer>
                <View style={{ backgroundColor: "#312E38", flex: 1 }}>
                    <AuthRoutes />
                </View>
                <StatusBar backgroundColor="#312E38" barStyle="light-content" />
            </NavigationContainer>
        </AppProvider>
    )
}

export default App;

