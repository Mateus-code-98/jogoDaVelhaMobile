import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Amigos } from "../pages/Amigos";
import { Home } from "../pages/Home";
import { Perfil } from "../pages/Pefil";
import Icon from 'react-native-vector-icons/Feather';

const User = createBottomTabNavigator();

export const UserRoutes: React.FC = () => (
    <User.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <User.Screen name="Amigos" options={{ tabBarIcon: ({ color, focused, size }) => (<Icon name="users" size={size} color={color} />) }} component={Amigos} />
        <User.Screen name="Home" options={{ tabBarIcon: ({ color, focused, size }) => (<Icon name="home" size={size} color={color} />) }} component={Home} />
        <User.Screen name="Perfil" options={{ tabBarIcon: ({ color, focused, size }) => (<Icon name="user" size={size} color={color} />) }} component={Perfil} />
    </User.Navigator>
)


