import React from "react";
import { View, StatusBar } from 'react-native';
import { Routes } from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from "./src/hooks";
import { useFonts, Rajdhani_700Bold, Rajdhani_400Regular, Rajdhani_500Medium, Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';

const App: React.FC = () => {
    let [FontsLoad] = useFonts({
        Rajdhani_700Bold, 
        Rajdhani_400Regular, 
        Rajdhani_500Medium, 
        Rajdhani_600SemiBold
    })
    if (!FontsLoad) return null
    else{
        return (
            <AppProvider>
                <NavigationContainer>
                    <View style={{ backgroundColor: "#0B1138", flex: 1 }}>
                        <Routes />
                    </View>
                    <StatusBar backgroundColor="#0B1138" barStyle="light-content" />
                </NavigationContainer>
            </AppProvider>
        )
    }
    
}

export default App;

