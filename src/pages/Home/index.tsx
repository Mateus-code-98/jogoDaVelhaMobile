import React, { useCallback } from "react";
import { Text, Image, ScrollView, TextInput, View } from "react-native";
import { Container, CreateAccountButton, CreateAccountButtonText, Title } from './style';
import { useNavigation } from '@react-navigation/native';
import Logo from './../../../assets/logo.png';
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-gesture-handler";

export const Home: React.FC = () => {
    const navigation = useNavigation<any>()

    return (
        <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}>
                <Text>Sair</Text>
            </TouchableOpacity>
            <Text>Home</Text>
        </View>
    )
}