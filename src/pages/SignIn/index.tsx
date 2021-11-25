import React from "react";
import { ScrollView, View } from "react-native";
import { Container, Description, TextButton, Title } from './style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginSVG } from "../../components/Icons/Login";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from '../../hooks/auth';

export const SignIn: React.FC = () => {
    const { signIn } = useAuth()
    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <View style={{ flex: 1, position: 'absolute' }}>
                <LoginSVG />
            </View>
            <Container>
                <View>
                    <Title>Conecte-se</Title>
                    <Title>e duele contra</Title>
                    <Title>seus amigos</Title>
                    <View style={{ marginTop: 10 }}>
                        <Description>Convide seus amigos para jogar</Description>
                        <Description>o bom e velho jogo da velha</Description>
                    </View>
                </View>
                <RectButton onPress={async ()=> await signIn({email:"teu@gmail.com",password:"123456"})} style={{ flexDirection: "row", alignItems: "center", borderRadius: 5, backgroundColor: "#E51C44", width: "100%", marginTop: 40 }}>
                    <View style={{ padding: 10, borderRightWidth: 1, borderRightColor: "#991F36" }}>
                        <Icon name="google" size={30} color="#FFF" />
                    </View>
                    <View style={{ padding: 10, flex: 1 }}>
                        <TextButton>Entrar com o Google</TextButton>
                    </View>
                </RectButton>
            </Container >
        </View>
    )
}