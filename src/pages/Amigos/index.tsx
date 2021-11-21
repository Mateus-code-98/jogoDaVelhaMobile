import React, { useCallback, useEffect } from "react";
import { Text, Image, ScrollView, TextInput, View } from "react-native";
import { Container, CreateAccountButton, CreateAccountButtonText, Title } from './style';
import { useNavigation } from '@react-navigation/native';
import Logo from './../../../assets/logo.png';
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import Icon from 'react-native-vector-icons/Feather';

export const Amigos: React.FC = () => {
    const navigation = useNavigation<any>()
    useEffect(()=>{
        console.log('Amigos')
    },[])
    return (
        <View>
            <Text>Amigos</Text>
        </View>
    )
}